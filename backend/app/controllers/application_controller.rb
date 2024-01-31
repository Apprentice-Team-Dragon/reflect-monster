class ApplicationController < ActionController::API
  def transform_camel_to_snake(params)
    params.transform_keys { |key| key.to_s.underscore.to_sym }
  end

  def transform_sname_to_camel(params)
    params.transform_keys { |key| key.tos.camelize.to_sym }
  end
end
