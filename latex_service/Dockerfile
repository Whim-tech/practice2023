# rust is just for fun feel free to change it to any debian based distro
FROM rust:bullseye

RUN apt-get update && \
    apt-get install -y texlive-latex-base texlive-latex-extra \
                    texlive-fonts-recommended texlive-fonts-extra \
                    texlive-science texlive-publishers texlive-lang-cyrillic \
                    texlive-xetex texlive-pictures texlive-metapost texlive-latex-recommended
WORKDIR /app

# CMD ["pdflatex", "-output-directory=/app", "-jobname=out", "main.tex"]
# 
# RUN cargo build --release
# CMD ["cargo", "run"]