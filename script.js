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
    const initialBotMessage = "Welcome to DenQ Implant Support. Our AI provides <strong>high-precision</strong> info on Fixtures and CAD/CAM systems. 🦷";
    appendMessage(initialBotMessage, 'bot', true); 

   // setTimeout(() => {
   //     appendMessage("Hello. I need info on the surgical kit.", 'user');
   // }, 1200);
});

// Dummy response logic
function getBotResponse(userText) {
    let reply = "I am a DenQ AI Chatbot. Once connected, I'll connect to our customer Center!";
    const lowerText = userText.toLowerCase();


    if (lowerText.includes('kit') || lowerText.includes('drill')) {
        reply = "Our standard drill speed is 800-1200 RPM for <strong>procedure streamlining</strong>. Which fixture line are you using?";
    }
    if ((lowerText.includes('Greeting') || lowerText.includes('hello')) || lowerText.includes('hi')) {
        reply = "Hi, It's DenQ Implant. How may I help you?";
    }
    if (lowerText.includes('Company') || lowerText.includes('history')) {
        reply = "DenQ established since 2019 by LeeTaehoon. DenQ is South Korean Dental implant Manufacturer which has experience over 20 years for the high precision, Plus Having FDA Clearane, ISO 13485, MFDS.";
    }
    if (lowerText.includes('Implant') || lowerText.includes('fixture')) {
        reply = "DenQ Fixture length start from 7mm, 8.5mm, 10mm, 11.5mm, 13mm, plus with SLA premium solution with connection titanium Grade 4";
    }

    appendMessage(reply, 'bot', true);
}