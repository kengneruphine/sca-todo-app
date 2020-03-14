import express from 'express';

exports.getList = function (req, res) {
    
    res.json({ message: "List of all todos created by this user" });
}
