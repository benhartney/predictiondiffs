class RemoveQuestionTypeFromQuestions < ActiveRecord::Migration[7.0]
  def change
    remove_column :questions, :question_type
  end
end
