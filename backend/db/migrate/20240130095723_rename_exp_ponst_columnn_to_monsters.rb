class RenameExpPonstColumnnToMonsters < ActiveRecord::Migration[7.1]
  def change
    rename_column :monsters, :exp_poinst, :exp_point
  end
end
