class Question < ApplicationRecord
    validates :external_id, uniqueness: true

    def title
      Rails.cache.fetch("#{id}/title") do
        data_from_api['title']
      end
    end

    def periodless_title_or_fallback
      if periodless_title.present?
        periodless_title
      else
        if question_type == 'binary'
          "#{title} - YES"
        else
          title
        end
      end
    end

    def periodless_title_inverted_or_fallback
      if periodless_title_inverted.present?
        periodless_title_inverted
      else
        if question_type == 'binary'
          "#{title} - NO"
        else
          title
        end
      end
    end

    def resolve_time
      Rails.cache.fetch("#{id}/resolve_time") do
        data_from_api["resolve_time"]
      end
    end


    def period_end_date_or_fallback
      if period_end_date.present?
        period_end_date
      else
        resolve_time.to_date
      end
    end

    def possibilities_type
      Rails.cache.fetch("#{id}/possibilities_type") do
        data_from_api["possibilities"]["type"]
      end
    end


    

    def scale_deriv_ratio
      Rails.cache.fetch("#{id}/scale_deriv_ratio") do
        data_from_api["possibilities"]["scale"]["deriv_ratio"]
      end
    end

    def scale_max_class_to_string
      Rails.cache.fetch("#{id}/scale_max_class_to_string") do
        data_from_api["possibilities"]["scale"]["max"].class.to_s
      end
    end

    def scale_max
      Rails.cache.fetch("#{id}/scale_max") do
        data_from_api["possibilities"]["scale"]["max"]
      end
    end

    def scale_min
      Rails.cache.fetch("#{id}/scale_min") do
        data_from_api["possibilities"]["scale"]["min"]
      end
    end

    def question_type
      if possibilities_type == 'binary'
        'binary'
      else
        if scale_max_class_to_string == "String"
          "date"
        else
          "amount"
        end
      end
    end


    def get_stored_first_and_last_prediction(time_period)
      ap "#{id}/get_stored_first_and_last_prediction/#{time_period}"
      Rails.cache.fetch("#{id}/get_stored_first_and_last_prediction/#{time_period}", expires_in: 30.minutes) do
        if time_period == '2m'
          start_time = Time.now - 2.months
        elsif time_period == '2w'
          start_time = Time.now - 2.weeks
        elsif time_period == '1w'
          start_time = Time.now - 2.week
        elsif time_period == '3d'
          start_time = Time.now - 3.days
        elsif time_period == '24h'
          start_time = Time.now - 24.hours
        else # this means it's last_visit_string
          start_time = last_visit_string.to_time
        end

        [
          find_closest_prediction(start_time),
          find_closest_prediction(Time.now.utc)
        ]
      end
    end

    def display_data(last_visit_string=nil)

      temp_array = []

      time_periods = ['2m', '2w', '1w', '3d', '24h']

      unless last_visit_string == nil
        time_periods << last_visit_string
      end

      time_periods.each do |x|

        stored_first_and_last_prediction = get_stored_first_and_last_prediction(x)
        
        if question_type == 'binary' && stored_first_and_last_prediction.last < 50
          stored_first_and_last_prediction_possibly_inverted = [
            100 - stored_first_and_last_prediction[0],
            100 - stored_first_and_last_prediction[1]
          ]
        else
          stored_first_and_last_prediction_possibly_inverted = stored_first_and_last_prediction
        end

        temp_array.push({
          time_period: x,
          first_and_last_prediction: stored_first_and_last_prediction,
          first_and_last_prediction_possibly_inverted: stored_first_and_last_prediction_possibly_inverted
        })
      end

      if question_type == 'binary' && temp_array.first[:first_and_last_prediction].last < 50
        periodless_title_for_display = periodless_title_inverted_or_fallback
      else
        periodless_title_for_display = periodless_title_or_fallback
      end
     
      {
          id: external_id,
          type: question_type,
          title_for_display: title,
          periodless_title_for_display: periodless_title_for_display,
          period_end_date: period_end_date_or_fallback,
          predictions: temp_array
      }
    end

    def convert_prediction(raw_prediction)
      if question_type == 'binary'
        (raw_prediction["community_prediction"] * 100).round
      elsif question_type == 'date'
        min = Date.strptime(scale_min, '%Y-%m-%d').in_time_zone.utc.to_time.to_i
        max = Date.strptime(scale_max, '%Y-%m-%d').in_time_zone.utc.to_time.to_i
        deriv_ratio = scale_deriv_ratio
        if deriv_ratio == 1
          Time.at((raw_prediction["community_prediction"]["q2"] * (max - min) + min)).in_time_zone.utc
        else
          log_scale_date(raw_prediction["community_prediction"]["q2"], min, max, deriv_ratio)
        end
      elsif question_type == 'amount'
        min = scale_min
        max = scale_max
        deriv_ratio = scale_deriv_ratio
        if deriv_ratio == 1
          (((raw_prediction["community_prediction"]["q2"] * (max - min) + min)))
        else
          (((log_scale(raw_prediction["community_prediction"]["q2"], min, max, deriv_ratio) * (max - min) + min)))
        end
      end
    end

    def find_closest_prediction(relevant_time)

      times_array = data_from_api["prediction_timeseries"].map do |raw_prediction|
        Time.at(raw_prediction["t"])
      end

      predictions_array = data_from_api["prediction_timeseries"].map do |raw_prediction|
        convert_prediction(raw_prediction)
      end



      closest_prediction = predictions_array.first
      closest_datetime = times_array.first

      times_array.each_with_index do |time_currently_being_checked, index|

        absolute_difference_for_existing_closest = (relevant_time - closest_datetime).abs
    
        absolute_difference_for_one_being_checked = (relevant_time - time_currently_being_checked).abs
    
        if absolute_difference_for_one_being_checked < absolute_difference_for_existing_closest
          closest_prediction = predictions_array[index]
          closest_datetime = time_currently_being_checked
        end
      end
      closest_prediction
    end




    def log_scale(value, min, max, deriv_ratio)
      (max - min) * ((deriv_ratio**value) - 1) / (deriv_ratio - 1) + min
    end

    def log_scale_date(value, min, max, deriv_ratio)
      seconds = log_scale(value, min / 1000, max / 1000, deriv_ratio)
      milliseconds = seconds * 1000
      Time.at(milliseconds)
    end

end
