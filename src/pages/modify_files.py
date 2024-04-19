import os

def process_file(file_path):
    try:
        # Afficher le nom du fichier en cours de traitement
        print(f"Traitement du fichier : {file_path}")

        # Ouvrir le fichier en mode lecture et lire le contenu
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()

        # Remplacer ';' par rien et '\'' par '\"'
        content = content.replace(';', '')
        content = content.replace("'", '"')

        # Réécrire le fichier modifié
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(content)
    except Exception as e:
        print(f"Erreur lors du traitement du fichier {file_path}: {e}")

def traverse_directories(root_path):
    # Parcourir récursivement tous les fichiers et sous-dossiers dans le répertoire racine
    for root, dirs, files in os.walk(root_path):
        for file in files:
            file_path = os.path.join(root, file)
            # Appliquer le traitement si le fichier est un fichier .jsx
            if file_path.endswith('.jsx'):
                process_file(file_path)

# Point d'entrée du script
if __name__ == '__main__':
    root_path = os.path.expanduser('~/projetAvetis/projetAnnuel/instamint/src/pages')
    traverse_directories(root_path)
