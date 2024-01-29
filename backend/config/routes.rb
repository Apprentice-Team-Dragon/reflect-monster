Rails.application.routes.draw do
  namespace "api" do
    get  "/goals/:id",    to: "goals#get"
    post "/goals",        to: "goals#create"
    put  "/goals/:id",    to: "goals#update"
    get  "/tasks",        to: "tasks#get"
    post "/tasks",        to: "tasks#create"
    put  "/tasks",        to: "tasks#update"
    get  "/monsters/:id", to: "monsters#get"
    put  "/monsters/:id", to: "monsters#update"
  end
end
