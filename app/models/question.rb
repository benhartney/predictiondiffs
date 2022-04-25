class Question < ApplicationRecord
    validates :external_id, uniqueness: true

    def update_data_from_api
        url = "https://www.metaculus.com/api2/questions/" + external_id + "/"
        response = Faraday.get(url)
        p response.status
        update! data_from_api: response.body
    end

    def display_data(from_string)
      from = from_string.to_time

      stored_first_and_last_prediction = first_and_last_prediction(from)

      if question_type == 'binary' && stored_first_and_last_prediction.last < 50
        title_for_display = title_inverted
        periodless_title_for_display = periodless_title_inverted
      else
        title_for_display = title_baseline
        periodless_title_for_display = periodless_title
      end
     
      {
          type: question_type,
          title_for_display: title_for_display,
          periodless_title_for_display: periodless_title_for_display,
          period_end_date: period_end_date,
          data_from_api: data_from_api,
          first_and_last_prediction: first_and_last_prediction(from)
      }
    end

    def convert_prediction(raw_prediction)
      if question_type == 'binary'
        (raw_prediction["community_prediction"] * 100).round
      elsif question_type == 'date'
        min = Date.strptime(data_from_api["possibilities"]["scale"]["min"], '%Y-%m-%d').in_time_zone.utc.to_time.to_i
        max = Date.strptime(data_from_api["possibilities"]["scale"]["max"], '%Y-%m-%d').in_time_zone.utc.to_time.to_i
        deriv_ratio = data_from_api["possibilities"]["scale"]["deriv_ratio"]
        if deriv_ratio == 1
          Time.at((raw_prediction["community_prediction"]["q2"] * (max - min) + min)).in_time_zone.utc
        else
          log_scale_date(raw_prediction["community_prediction"]["q2"], min, max, deriv_ratio)
        end
      elsif question_type == 'amount'
        min = data_from_api["possibilities"]["scale"]["min"]
        max = data_from_api["possibilities"]["scale"]["max"]
        deriv_ratio = data_from_api["possibilities"]["scale"]["deriv_ratio"]
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


    def first_and_last_prediction(from)
      first = find_closest_prediction(from)
      last = find_closest_prediction(Time.now.utc)

      if question_type == 'binary' && last < 50
        first = 100 - first
        last = 100 - last
      end

      [
        first,
        last
      ]
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
