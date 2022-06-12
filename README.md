# file-manager

This node.js app gives you possibility to work with the files in your computer with help of terminal, typing there the following commands:

[X] __up__ Go upper from current directory (when you are in the root folder this operation shouldn't change working directory
[X] __cd path_to_directory__  Go to dedicated folder from current directory (path_to_directory can be relative or absolute)
[X] __ls__ List all files and folder in current directory and print it to console

[X] __cat path_to_file__ Read file and print it's content in console
[X] __add new_file_name__ Create empty file in current working directory
[X] __rn path_to_file new_filename__ Rename file
[X] __cp path_to_file path_to_new_directory__ Copy file
[X] __mv path_to_file path_to_new_directory__ Move file
[X] __rm path_to_file__ Delete file

[X] __os --EOL__ Get EOL (default system End-Of-Line)
[X] __os --cpus__ Get host machine CPUs info 
[X] __os --homedir__ Get home directory
[X] __os --username__ Get current system user name
[X] __os --architecture__ Get CPU architecture for which Node.js binary has compiled

[X] __hash path_to_file__ Calculate hash for file and print it into console

[X] __compress path_to_file path_to_destination__ Compress file (using Brotli algorytm)
[X] __decompress path_to_file path_to_destination__ Decompress file (using Brotli algorytm)


### Paths to be typed instead of "path_to_file" (and ext.) could be either relative (like '../text.txt', 'test/text.txt') or absolute (like "C:\Users\user\Desktop\test\text.docx")