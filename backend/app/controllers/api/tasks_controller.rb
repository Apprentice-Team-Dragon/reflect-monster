class Api::TasksController < ApplicationController
  before_action :set_goal_id, only: [:get, :create, :update]
  before_action :set_tasks, only: [:get, :update]

  def get
    render json: { tasks: @tasks }, status: 200
  end

  def create
    task = create_task(params[:task])
    render json: { task: task }, status: 201
  end

  def update
    task = update_tasks(params[:tasks], @tasks)
    render json: { task: task }, status: 201
  end

  private
    def set_goal_id
      @goal_id = params[:goal_id]
    end

    def set_tasks
      @tasks = Task.where(goal_id: @goal_id, exec_date: params[:exec_date])
    end

    def create_update_params(task)
      use_params = task.slice(:content, :isCompleted, :isRemoved)
      transform_camel_to_snake(use_params).permit!
    end

    def create_task(task)
      Task.create(
        goal_id: @goal_id,
        content: task["content"],
        exec_date: task["exec_date"]
      )
    end

    def update_tasks(tasks, base_tasks)
      registered_tasks = tasks.map { |ele| base_tasks.find(ele[:id]) }

      registered_tasks.each_with_index do |task, index|
        task.update(create_update_params(tasks[index]))
      end
    end
end
