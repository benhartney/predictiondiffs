

task :get_questions => :environment do
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
  categories.each do |category_hash|
    ap category_hash
    ap category_hash[:id]
    url_for_open_questions = "https://www.metaculus.com/api2/questions/?search=cat:#{category_hash[:id]}&status=open&type=forecast"
    ap '---------------------------- getting open questions'
    while url_for_open_questions != nil
      response = Faraday.get(url_for_open_questions)
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
          Question.create(external_id: id, data_from_api: result, categories: category_hash[:id], status: 'open')
        end
      end
      url_for_open_questions = JSON.parse(response.body)['next']
    end

    ap '---------------------------- getting closed questions'
    url_for_closed_questions = "https://www.metaculus.com/api2/questions/?search=cat:#{category_hash[:id]}&status=closed&type=forecast"
    while url_for_closed_questions != nil
      response = Faraday.get(url_for_closed_questions)
      JSON.parse(response.body)['results'].each do |result|
        id = result["id"]
        ap id
        existing_question = Question.where(external_id: id).first # TODO change this to only get ones that are open, in the db
        if existing_question.present?
          ap 'found existing question'
          # note: this will also catch questions that are in multiple categories."
          existing_question.update! status: 'closed'
        end
      end
      url_for_closed_questions = JSON.parse(response.body)['next']
    end
  end
end

