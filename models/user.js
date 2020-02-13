module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        userid: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true
        },
        usertype: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        company: {
            type: DataTypes.STRING(20),
            allowNull: false
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci'
    })

    return User
}