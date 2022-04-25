

task :get_questions => :environment do
  categories = [
    {
      id: "geopolitics--armedconflict",
      display_name: "Geopolitics - Armed Conflict"
    },
    {
        id: "business--manda",
        display_name: "Business – Mergers and Acquisitions"
    }
  ]
  categories.each do |category_hash|
    ap category_hash
    ap category_hash[:id]
    url = "https://www.metaculus.com/api2/questions/?search=cat:#{category_hash[:id]}&status=open&type=forecast"
    while url != nil
      response = Faraday.get(url)

      JSON.parse(response.body)['results'].each do |result|
        id = result["id"]
        ap id
        existing_question = Question.where(external_id: id).first
        if existing_question.present?
          # note: this will also catch questions that are in multiple categories."
          existing_question.update! data_from_api: result

          categories_array = existing_question.categories.split(',')
          if categories_array.include?(category_hash[:id]) == false
            existing_question.update! categories: existing_question.categories + "," + category_hash[:id]
          end
        else
          Question.create(external_id: id, data_from_api: result, categories: category_hash[:id])
        end
      end

      url = JSON.parse(response.body)['next']
    end
  end
end

