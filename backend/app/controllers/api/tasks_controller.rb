class Api::TasksController < ApplicationController
  before_action :set_goal_id, only: [:get, :create, :update]
  before_action :set_tasks, only: [:get, :update]

  def get
    render_tasks(@tasks)
  end

  def create
    tasks = create_tasks(@goal_id, params[:tasks])
    render_tasks(tasks)
  end

  def update
    tasks = update_tasks(params[:tasks], @tasks)
    render_tasks(tasks)
  end

  private
    def set_goal_id
      @goal_id = params[:goalId]
    end

    def set_tasks
      @tasks = Task.where(goal_id: @goal_id, exec_date: params[:execDate])
    end

    def render_tasks(tasks)
      render json: { tasks: tasks.map { |ele| ele.generate_response } }
    end

    def create_update_params(task)
      use_params = task.slice(:content, :isCompleted, :isRemoved)
      transform_camel_to_snake(use_params).permit!
    end

    def create_tasks(goal_id, tasks)
      tasks.map do |task|
        new_task = Task.new(goal_id:, content: task[:content], exec_date: task[:execDate])
        new_task.save
        new_task
      end
    end

    def update_tasks(tasks, base_tasks)
      registered_tasks = tasks.map { |ele| base_tasks.find(ele[:id]) }

      registered_tasks.each_with_index do |task, index|
        task.update(create_update_params(tasks[index]))
      end
    end
end
