FROM node:bullseye

ARG DEBIAN_FRONTEND=noninteractive

RUN apt-get update 
RUN apt-get install -y texlive-latex-base texlive-latex-extra \
                    texlive-fonts-recommended texlive-lang-cyrillic \
                    texlive-science texlive-pictures \
                    texlive-xetex 
# enable auto accepting terms of use
# RUN echo ttf-mscorefonts-installer msttcorefonts/accepted-mscorefonts-eula select true | debconf-set-selections
# install all fonts like TimesNewRomen
RUN apt-get install -y  fonts-liberation

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "dev"]

# full list of packages
# RUN apt-get install -y texlive-latex-base texlive-latex-extra texlive-latex-recommended \
#                     texlive-fonts-recommended texlive-fonts-extra texlive-lang-cyrillic \
#                     texlive-science texlive-publishers texlive-pictures texlive-metapost\
#                     texlive-xetex 