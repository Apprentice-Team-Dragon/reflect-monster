# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_01_30_095723) do
  create_table "goals", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.text "content", null: false
    t.boolean "is_completed", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "monsters", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.text "image", null: false
    t.bigint "exp_point", null: false
    t.bigint "max_exp_point", null: false
    t.integer "evolution_stage", null: false
    t.string "species", null: false
    t.string "color", null: false
    t.integer "seed", default: 0, null: false
    t.boolean "is_selected", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tasks", charset: "utf8mb4", collation: "utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.bigint "goal_id", null: false
    t.text "content", null: false
    t.boolean "is_completed", default: false, null: false
    t.boolean "is_removed", default: false, null: false
    t.date "exec_date", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["goal_id"], name: "index_tasks_on_goal_id"
  end

  add_foreign_key "tasks", "goals"
end