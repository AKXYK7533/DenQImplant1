const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', handleSend);
userInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') handleSend();
});

function handleSend() {
    const text = userInput.value.trim();
    if (text === '') return;

    appendMessage(text, 'user', false);
    userInput.value = '';

    setTimeout(() => {
        getBotResponse(text);
    }, 800); 
}

// Generates a formatted date and time string (e.g., "Mar 13, 14:30")
function getCurrentTimestamp() {
    const now = new Date();
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return now.toLocaleDateString('en-US', options);
}

// Updated function to create a wrapper containing both the bubble and the timestamp
function appendMessage(text, senderType, isHTML = false) {
    // Create the outer wrapper
    const wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add('message-wrapper');
    
    // Determine classes based on sender
    if (senderType === 'bot') {
        wrapperDiv.classList.add('wrapper-bot');
    } else {
        wrapperDiv.classList.add('wrapper-user');
    }

    // Create the actual message bubble
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(senderType === 'bot' ? 'bot-message' : 'user-message');
    
    if (isHTML) {
        messageDiv.innerHTML = text;
    } else {
        messageDiv.textContent = text;
    }

    // Create the timestamp element
    const timeDiv = document.createElement('div');
    timeDiv.classList.add('timestamp');
    timeDiv.textContent = getCurrentTimestamp();

    // Assemble the parts
    wrapperDiv.appendChild(messageDiv);
    wrapperDiv.appendChild(timeDiv);
    
    // Add to chat window
    chatMessages.appendChild(wrapperDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Pre-load initial messages
document.addEventListener('DOMContentLoaded', () => {
    const initialBotMessage = "Welcome to <strong>DenQ Implant AI</strong> Support 🦷";
    appendMessage(initialBotMessage, 'bot', true); 

   // setTimeout(() => {
   //     appendMessage("Hello. I need info on the surgical kit.", 'user');
   // }, 1200);
});

// Function to get download links
function getDownloadLink(item) {
    const links = {
        'catalog': 'DenQ_Catalog.pdf',
        'brochure': 'DenQ_Brochure.pdf',
        'price list': 'DenQ_PriceList.pdf'
    };
    return links[item] || null;
}

// Function to get product information
function getProductInfo(product) {
    const products = {
        'fixture': {
            image: 'Fixture.jpg',
            description: 'SLA Premium Solution, featuring a titanium Grad 4.',
            sizes: 'Available in various diameters: 3.5mm, 4.0mm, 4.5mm, 5.0mm, and length: 7mm, 8.5mm, 10mm, 11.5mm, 13mm.'
        },
        'surgical kit': {
            image: 'DenQTaper.png',
            description: 'Our surgical kit includes all necessary instruments for precise implant placement, ensuring accuracy and efficiency in dental procedures.',
            sizes: 'Standard kit with drills ranging from 2.0mm to 5.0mm diameter, including osteotomes and carriers.'
        },
        'cad/cam': {
            image: 'CADCAM.png',
            description: 'CAD/CAM technology allows for custom-designed restorations with high precision and perfect fit, using computer-aided design and manufacturing.',
            sizes: 'Compatible with various milling machines; custom sizes available based on patient scans.'
        },
        'overdenture': {
            image: 'https://denq.com/images/overdenture.jpg',
            description: 'An overdenture is a removable dental prosthesis that covers and rests on one or more remaining natural teeth or implants, providing stability and comfort.',
            sizes: 'Available in full arch or partial; custom fitted to patient needs with various attachment systems.'
        }
    };
    return products[product.toLowerCase()] || null;
}

// Dummy response logic
function getBotResponse(userText) {
    let reply = "I am a DenQ AI Chatbot. Once connected, I'll connect to our customer Center!";
    const lowerText = userText.toLowerCase();


    // Greeting detection (prioritized), matching whole words only
    const greetingTokens = new Set([
        'good', 'morning', 'afternoon', 'evening',
        'hi', 'hello', 'hey', 'yo', 'whatever'
    ]);

    const normalizedTokens = (lowerText.match(/\b[\w']+\b/g) || []).map(t => t.toLowerCase());
    const isGreeting = normalizedTokens.some(token => greetingTokens.has(token));

    if (isGreeting) {
        reply = "Hi, it's DenQ Implant. How may I help you?";

    } else if (lowerText.includes('company') || lowerText.includes('history')) {
        reply = "DenQ established since 2019 by LeeTaehoon. DenQ is South Korean Dental implant Manufacturer which has experience over 20 years for the high precision, Plus Having FDA Clearane, ISO 13485, MFDS.";
    
    } else if (lowerText.includes('thank you') || lowerText.includes('thanks')) {
        const responses = [
            "You're welcome! Let me know if there's anything else I can help with.",
            "My pleasure! Is there anything more I can assist you with?",
            "No problem at all! Feel free to ask if you need further information."
        ];
        reply = responses[Math.floor(Math.random() * responses.length)];
    } else if (lowerText.includes('catalog') || lowerText.includes('brochure') || lowerText.includes('price list')) {
        let response = '';
        if (lowerText.includes('catalog')) {
            response += "Yes, definitely. Here is theCatalog: <a href='" + getDownloadLink('catalog') + "' target='_blank'>Download PDF</a><br>";
        }
        if (lowerText.includes('brochure')) {
            response += "Yes, definitely. Here is the Brochure: <a href='" + getDownloadLink('brochure') + "' target='_blank'>Download PDF</a><br>";
        }
        if (lowerText.includes('price list')) {
            response += "Yes, definitely. Here is the Price List: <a href='" + getDownloadLink('price list') + "' target='_blank'>Download PDF</a><br>";
        }
        reply = response || "Please specify which document you'd like to download.";
    } else if (lowerText.includes('fixture') || lowerText.includes('surgical kit') || lowerText.includes('cad/cam') || lowerText.includes('overdenture')) {
        let response = '';
        if (lowerText.includes('fixture')) {
            const info = getProductInfo('fixture');
            response += `<img src="${info.image}" alt="Fixture" style="max-width:200px; height:auto;"><br><strong>Fixture:</strong> ${info.description}<br><strong>Sizes:</strong> ${info.sizes}<br><br>`;
        }
        if (lowerText.includes('surgical kit')) {
            const info = getProductInfo('surgical kit');
            response += `<img src="${info.image}" alt="Surgical Kit" style="max-width:200px; height:auto;"><br><strong>Surgical Kit:</strong> ${info.description}<br><strong>Sizes:</strong> ${info.sizes}<br><br>`;
        }
        if (lowerText.includes('cad/cam')) {
            const info = getProductInfo('cad/cam');
            response += `<img src="${info.image}" alt="CAD/CAM" style="max-width:200px; height:auto;"><br><strong>CAD/CAM:</strong> ${info.description}<br><strong>Sizes:</strong> ${info.sizes}<br><br>`;
        }
        if (lowerText.includes('overdenture')) {
            const info = getProductInfo('overdenture');
            response += `<img src="${info.image}" alt="Overdenture" style="max-width:200px; height:auto;"><br><strong>Overdenture:</strong> ${info.description}<br><strong>Sizes:</strong> ${info.sizes}<br><br>`;
        }
        reply = response || "Please specify which product you'd like information about.";
    } else {
        reply = "I am a robot assistent please contact our team by this number: 010-8214-9794 or email: biz@denq.kr for more details";
    }

    appendMessage(reply, 'bot', true);
}
