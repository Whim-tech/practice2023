
# usage:
# docker build -t latex_service .
# docker run --rm -t -v "FULL_PATH_TO_LATEX:/tmp" latex_service:latest xelatex main.tex

FROM ubuntu:latest

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update 
RUN apt-get install -y texlive-latex-base texlive-latex-extra \
                    texlive-fonts-recommended texlive-lang-cyrillic \
                    texlive-science texlive-pictures \
                    texlive-xetex 
# enable auto accepting terms of use
RUN echo ttf-mscorefonts-installer msttcorefonts/accepted-mscorefonts-eula select true | debconf-set-selections
# install all fonts like TimesNewRomen
RUN apt-get install -y ttf-mscorefonts-installer

WORKDIR /tmp

# full list of packages
# RUN apt-get install -y texlive-latex-base texlive-latex-extra texlive-latex-recommended \
#                     texlive-fonts-recommended texlive-fonts-extra texlive-lang-cyrillic \
#                     texlive-science texlive-publishers texlive-pictures texlive-metapost\
#                     texlive-xetex 