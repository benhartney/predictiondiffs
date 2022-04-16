class QuestionsController < ApplicationController
    def index
        @questions = Question.all
        @response = @questions.map do |question|
            {id: question.external_id, data: question.data_from_api}
        end
        render :json => @response 
    end
end