import glob, json, webbrowser

counter = 0

files = glob.glob('analysisChamber/**', recursive=True)
filedata = []
filenames = []

for x in range(len(files)):
    try:
        with open(files[x-1], "r") as file:
            filedata.append(file.read().split("\n"))
            filenames.append(files[x-1])
            
    except:
        pass

with open('data.js', 'w') as f:
    f.write("const files = ")

with open('data.js', 'a') as f:
    json.dump(filedata, f)

with open('data.js', 'a') as f:
    f.write("\n\nconst filenames = ")

with open('data.js', 'a') as f:
    json.dump(filenames, f)

print("Analysis Complete, Opening Visualiser In Browser")
webbrowser.open(r'index.html')