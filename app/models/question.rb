class Question < ApplicationRecord

    def update_data_from_api
        url = "https://www.metaculus.com/api2/questions/" + external_id + "/"
        response = Faraday.get(url)
        p response.status
        update! data_from_api: response.body
    end

end
