
# THE REAPER FRAMEWORK
A ts based backend framework that supports front end React.js template rendering
## Docs
https://www.reaperjs.com/
```sh
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
```


