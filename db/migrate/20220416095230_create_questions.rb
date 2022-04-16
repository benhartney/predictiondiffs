class CreateQuestions < ActiveRecord::Migration[7.0]
  def change
    create_table :questions do |t|
      t.string :external_id
      t.json :data_from_api

      t.timestamps
    end
  end
end
