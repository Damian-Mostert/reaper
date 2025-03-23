#!/usr/bin/env node
const packageJson = require('./package.json');
const logger = require("./utils/logger")
const chalk = require("chalk");
const rpr = `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀reaperjs@${packageJson.version}⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣶⡶⠿⠿⣶⣶⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⡿⠋⠁⠀⠀⠀⠀⠉⠛⢿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⠾⣷⡆⠀⠀⠀⠀⠀⢀⣴⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢀⣴⠟⠁⢰⣿⠃⠀⠀⠀⢀⣴⣿⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣴⡟⠁⠀⢠⣾⠇⠀⠀⢀⣴⡿⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣷⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⣠⡾⢫⠀⠀⠀⣾⡏⠀⣠⣴⣿⠟⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣿⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⣰⣿⡷⣾⡇⠀⠀⣿⣷⣿⠟⠋⠀⠀⠀⠀⠀⠀⣠⣴⣻⣥⠖⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⣸⠟⠁⢠⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣾⠟⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠈⢿⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣼⡇⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⡿⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠻⢿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⣿⡇⠀⠀⠀⠀⠀⣠⣴⣾⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠻⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢿⣇⠀⣀⣤⣾⠟⣿⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠘⠛⠟⠛⠋⠀⣸⡟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣶⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⡿⠙⣿⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣷⡀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⢀⣾⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⡿⠋⠀⠀⠈⠻⣷⣤⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⣧⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⣼⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⡿⠋⠀⠀⠀⠀⠀⠀⠈⠻⣿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⡇⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣸⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⢿⣦⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⡆⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⣰⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⠿⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣶⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⣿⡆⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢰⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣾⠟⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠹⣿⡄⠀⠀⠀⠀
⠀⠀⠀⢰⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣟⣁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣉⣻⣷⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⡄⠀⠀⠀
⠀⠀⢠⣿⠇⠀⠀⠀⠀⠀⠀⠀⢀⣴⡿⣿⠉⠙⠻⠷⣦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣶⠾⠛⠉⠉⡿⣿⣦⡀⠀⠀⠀⠀⠀⠀⠀⢻⣧⡀⠀⠀
⠀⠀⣼⡏⠀⠀⠀⠀⠀⠀⢀⣴⣿⡟⠀⣿⡄⠀⠀⠀⠈⠙⠷⣶⣄⡀⠀⠀⠀⠀⣦⠀⠀⠀⠀⢀⣠⣶⠟⠋⠁⠀⠀⠀⢸⡇⠈⣿⣿⣦⡀⠀⠀⠀⠀⠀⠈⢿⡇⠀⠀
⠀⢰⣿⠃⠀⠀⠀⠀⢀⣴⣿⣿⡿⠁⠀⠸⣷⣄⠀⠀⠀⠀⠀⠈⠉⠻⣶⣦⣄⣰⣿⣀⣠⣴⣾⠛⠉⠀⠀⠀⠀⠀⠀⣠⡿⠃⠀⠘⢿⣿⣿⣦⡀⠀⠀⠀⠀⢸⣿⡀⠀
⠀⢸⡿⠀⠀⠀⠀⣰⡿⢿⣿⠋⠀⠀⠀⠀⠀⠽⣳⣦⣀⠀⠀⣀⣴⠿⠯⠟⠉⠉⠉⠉⠉⠿⠙⢶⣄⡀⠀⠀⣀⡶⣿⠍⠀⠀⠀⠀⠀⠹⣿⡿⣷⡆⠀⠀⠀⠀⣿⡇⠀
⠀⢸⡇⠀⠀⠀⣼⡟⠁⣿⣇⠀⠀⠀⠀⠀⠀⠀⠈⠙⠻⠗⠛⠋⠁⠀⠀⠀⠀⣠⣤⣄⠀⠀⠀⠀⠈⠙⠓⠾⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀⣻⡇⠘⣿⣆⠀⠀⠀⣿⡇⠀
⠀⢸⣷⠀⠀⢸⣿⠁⠀⠹⣿⣶⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠏⠀⢻⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣾⡿⠃⠀⠸⣿⡄⠀⠀⣿⡇⠀
⠀⢸⣿⡀⠀⣾⡇⠀⠀⠀⠀⠙⢿⣷⣦⡀⢀⣤⣶⡿⢿⣷⣦⠀⠀⠀⠀⣰⡟⠀⠀⠀⢿⡄⠀⠀⠀⢀⣴⣿⠿⣿⣶⣤⡀⣀⣴⣾⠟⠉⠀⠀⠀⠀⢻⡇⠀⢸⣿⠃⠀
⠀⠀⢻⣧⠀⢻⡇⠀⠀⠀⠀⠀⠀⠈⠙⠛⠛⠛⢿⣄⠀⣿⠹⡆⠀⠀⢰⠏⠀⠀⣤⠀⠀⢿⡀⠀⠀⢸⠁⣿⠀⣴⡿⠛⠛⠛⠋⠀⠀⠀⠀⠀⠀⠀⣼⡇⢀⣾⡏⠀⠀
⠀⠀⠘⢿⣇⢸⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣠⡟⠀⣇⠀⠀⠘⠳⠦⠾⠛⠶⠴⠿⠁⠀⠀⠈⠀⣿⡀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⢃⣼⡟⠀⠀⠀
⠀⠀⠀⠈⢻⣧⣻⣧⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⢿⣦⠞⠻⣆⣴⣦⣀⣤⣀⣀⣀⣤⣀⣴⣦⣴⠛⠶⣼⡿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣾⣯⣾⡟⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠹⣿⣿⣷⡄⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⠈⣿⣄⡀⠉⠀⠘⠛⠉⠛⠈⠛⠉⠛⠁⠈⠁⢀⣴⡏⠁⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣿⣿⡿⠃⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠈⠻⣿⣿⣦⣄⠀⠀⠀⠀⠀⠀⣼⡏⠀⢻⡈⠙⠓⣦⣤⣀⠀⠀⠀⠀⠀⣠⣤⡴⠛⠋⣨⠇⠀⣿⡇⠀⠀⠀⠀⠀⠀⣠⣾⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⣿⣿⣦⣀⠀⠀⠀⣿⣧⠀⠀⠙⠲⣦⡀⡀⠉⠛⠛⠒⠛⠛⠁⣀⢀⣴⠞⠁⠀⢀⣹⡷⠀⠀⠀⣠⣴⣿⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⣿⣿⣦⣄⠈⠛⢿⣦⡀⠀⠈⠛⠛⠶⣼⣆⢀⣰⣤⠞⠛⠋⠀⠀⢀⣴⡿⠋⠀⣠⣴⣿⣻⣿⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠻⣷⣝⠻⣿⣤⡀⠙⢿⣤⠀⠀⠀⠀⠀⠈⠉⠁⠀⠀⠀⠀⢀⣴⡟⠁⢀⣴⣿⠟⣩⣾⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣷⣌⢛⢿⣦⡀⠻⣷⣤⣤⣴⣶⣶⣶⣶⣶⣤⣤⣤⡿⠋⣠⣾⡿⠋⣤⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣷⣄⠙⢿⣦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣾⠟⠁⣠⣾⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣦⠀⠻⣷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⡿⠋⢀⣼⠟⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢷⣄⠈⢿⣦⠀⠀⠀⠀⠀⠀⢀⣾⠟⠁⣰⡿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠻⣷⣄⢙⢷⣄⠀⠀⠀⣠⠿⠁⣠⡾⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣷⣄⡉⠓⠶⠚⢁⣠⡾⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡈⣙⠿⠶⠶⠶⠟⡉⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
`

const result = rpr.replace(/./g, (char) =>
    char === "⠀" 
        ? chalk.hidden(char)  // Gray background, black text
        : chalk.green(char)  // Red background, white text
);


console.log(result)
const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");
const args = process.argv.slice(2);
const envDir =path.join(process.cwd(), "./.env")
const mkFiles = fs.readdirSync(path.join(__dirname, "./commands/make"));
const mkCommands = {};

for (const file of mkFiles) {
  if(file.endsWith(".js"))
  mkCommands[`make ${file.replace(".js", "")}`] = `npx env-cmd -f "${envDir}" node ${__dirname}/commands/make/${file} {{}}`;
}

const scripts = {
  ...mkCommands,
  "help": `node ${path.join(__dirname,"commands/help.js")}`,
  "seed": `npx env-cmd -f "${envDir}" node ${path.join(__dirname, "commands/seed")} {{}}`,
  "migrate": `npx env-cmd -f "${envDir}" node ${path.join(__dirname, "commands/migrate")}`,
  "rollback": `npx env-cmd -f "${envDir}" node ${path.join(__dirname, "commands/rollback")}`,
  "init": `node ${__dirname}/commands/init.js`,
  "build": `npx env-cmd -f "${envDir}" node ${path.join(__dirname, "commands/build.js")}`,
  "dev": `npx env-cmd -f "${envDir}" node ${path.join(__dirname, "commands/dev.js")}`,
  "vercel": `npx env-cmd -f "${envDir}" node ${path.join(__dirname, "commands/vercel.js")}`,
  "start": `npx env-cmd -f "${envDir}" node ${path.join(__dirname, "commands/start.js")}`,
};

const command = args.length >  2 ? args.filter((_,i)=>i!=args.length-1).join(" "):args[0];
const commandArgs = args.slice(1);
if (scripts[command]) {
  let script = scripts[command];  
  commandArgs.forEach((arg, index) => {
    script = script.replace(/{{}}/g,commandArgs[index]);
  });
  const child = spawn(script, { stdio: "inherit", shell: true });
  child.on("error", (err) => {
    console.error(`Failed to start command: ${command}`);
    console.error(err.message);
    process.exit(1);
  });
  child.on("exit", (code) => {
    process.exit(code || 0);
  });
} else {
  logger.error(`Unknown command: ${command}`)
  logger.info(`Available commands:
\t\t\t\t${Object.keys(scripts).join("\n\t\t\t\t")}
`);
  process.exit(1);
}