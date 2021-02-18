const sequelize = require("../db");

module.exports = (sequelize, DataTypes) => {
  const Comic = sequelize.define('comic', {
    issue_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    issue_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    issue_number: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cover_date: {
      type: DataTypes.STRING,
      allowNull: true
    },
    volume_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    volume_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    story_arcs: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: true
    },
    teams: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(5000),
      allowNull: true
    },
    characters: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true
    },
    original_image_url: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    thumb_image_url: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    small_image_url: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    api_detail_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    owner: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  })
  return Comic;
};