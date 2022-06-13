class QuestionsController < ApplicationController
    def index

        categories = [
            {
                id: "bio",
                display_name: "Biology"
            },
            {
                id: "business",
                display_name: "Business"
            },
            {
                id: "business--manda",
                display_name: "Business – Mergers and Acquisitions"
            },
            {
              id: "geopolitics--armedconflict",
              display_name: "Geopolitics - Armed Conflict"
            },
            {
                id: "industry--space",
                display_name: "Industry – Space"
            },
            {
                id: "politics",
                display_name: "Politics"
            },
            {
                id: "social",
                display_name: "Social Issues"
            }
          ]

        questions = Question.where(status: 'open').find_all do |question|
            question.data_from_api["resolution"] == nil && question.data_from_api["prediction_timeseries"].present?
            # the resolution check may be duplicative of status:open check
        end


        all_category_ids = []
        questions.each do |published_question|
            category_id_array_from_question = published_question.categories.split(',')
            all_category_ids = all_category_ids + category_id_array_from_question
        end
        all_category_ids = all_category_ids.uniq

        response = []
        all_category_ids.each do |category_id|
            questions_in_the_category = questions.find_all do |published_question|
                published_question.categories.split(',').include?(category_id)
            end
            response.push({
                html_id: category_id,
                title: categories.find { |c| c[:id] == category_id }[:display_name],
                questions: questions_in_the_category.map { |question| question.display_data(params[:from]) }
            })
        end

        render json: response
    end
end
