class QuestionsController < ApplicationController
    def index
        @questions = Question.all
        @response = @questions.map do |question|
            {id: question.external_id, data: JSON.parse(question.data_from_api)}
        end
        headers['Access-Control-Allow-Origin'] = '*'
        headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
        headers['Access-Control-Request-Method'] = '*'
        headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        render :json => @response 
    end
end
