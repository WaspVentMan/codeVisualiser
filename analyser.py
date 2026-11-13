import glob, json, webbrowser

counter = 0

files = glob.glob('analysisChamber/**', recursive=True)
filenames = []

for x in range(len(files)):
    try:
        with open(files[x-1], "r") as file:
            filenames.append(file.read().split("\n"))
            
    except:
        pass

with open('data.js', 'w') as f:
    f.write("const files = ")

with open('data.js', 'a') as f:
    json.dump(filenames, f, indent=4)

print("Analysis Complete, Opening Visualiser In Browser")
webbrowser.open(r'index.html')