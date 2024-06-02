#!/bin/bash

# Fichier de sortie
output_file="code.txt"

# Fonction pour parcourir les fichiers et dossiers
parcourir_dossiers() {
    local dir="$1"

    # Parcourir tous les éléments dans le répertoire
    for entry in "$dir"/*; do
        # Si c'est un dossier et ce n'est pas un des dossiers à ignorer, parcourir récursivement
        if [ -d "$entry" ]; then
            case "$(basename "$entry")" in
                "node_modules" | "api-notification" | "api-nft" | "api-post" )
                    # Ignorer ces dossiers spécifiques
                    ;;
                *)
                    parcourir_dossiers "$entry"
                    ;;
            esac
        elif [ -f "$entry" ]; then
            case "$(basename "$entry")" in
                "package-lock.json" | "parcourir.sh" | "code.txt" | \
                "index.jsx" | "deletePost.mjs" | "foryouPostGet.mjs" | "getUserPosts.mjs" | \
                "likePostDelete.mjs" | "likePostPost.mjs" | "likedPostGet.mjs" | \
                "likesPostGet.mjs" | "reportPostPost.mjs" | "subscribedPostGet.mjs" | \
                "Dockerfile" | "Makefile" | "nodemon.json")
                    # Ignorer ces fichiers spécifiques
                    ;;
                *)
                    # Écrire le nom et contenu des autres fichiers dans le fichier de sortie
                    echo "Nom du fichier: $entry" >> "$output_file"
                    echo "Contenu:" >> "$output_file"
                    cat "$entry" >> "$output_file"
                    echo -e "\n\n" >> "$output_file"
                    ;;
            esac
        fi
    done
}

# Vider le fichier de sortie s'il existe déjà
> "$output_file"

# Démarrer le parcours à partir du répertoire courant
parcourir_dossiers "."

echo "Le parcours est terminé. Les résultats sont enregistrés dans $output_file."
