import os, shutil

with open('data.js', 'w') as f:
    f.write("const files = []\n\nconst filenames = []")

shutil.rmtree('analysisChamber', ignore_errors=False, onerror=None)
os.makedirs('analysisChamber')