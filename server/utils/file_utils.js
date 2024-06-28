const fs = require('fs');


// Fonction pour ajouter du contenu à la conversation dans le fichier
function appendToConversation(content) {
    const conversationFile = 'conversation.txt';
    fs.appendFile(conversationFile, content, (err) => {
      if (err) {
        console.error('Erreur lors de l\'écriture dans le fichier de conversation:', err);
      }
    });
  }


  module.exports = {
    appendToConversation
  }