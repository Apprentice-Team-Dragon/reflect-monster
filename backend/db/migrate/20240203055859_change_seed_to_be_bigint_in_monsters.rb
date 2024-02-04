class ChangeSeedToBeBigintInMonsters < ActiveRecord::Migration[7.1]
  def change
    change_column :monsters, :seed, :bigint
  end
end
