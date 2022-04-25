class QuestionsController < ApplicationController
    def index

        categories = [
            {
              id: "geopolitics--armedconflict",
              display_name: "Geopolitics - Armed Conflict"
            },
            {
                id: "business--manda",
                display_name: "Business – Mergers and Acquisitions"
            },
            {
                id: "politics",
                display_name: "Politics"
            }
          ]

        published_questions = Question.where(published: true).find_all do |question|
            question.data_from_api["resolution"] == nil
        end


        all_category_ids = []
        published_questions.each do |published_question|
            category_id_array_from_question = published_question.categories.split(',')
            all_category_ids = all_category_ids + category_id_array_from_question
        end
        all_category_ids = all_category_ids.uniq

        response = []
        all_category_ids.each do |category_id|
            published_questions_in_the_category = published_questions.find_all do |published_question|
                published_question.categories.split(',').include?(category_id)
            end
            response.push({
                html_id: category_id,
                title: categories.find { |c| c[:id] == category_id }[:display_name],
                questions: published_questions_in_the_category.map { |question| question.display_data(params[:from]) }
            })
        end

        render json: response
    end
end
