// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const menuItems = document.querySelectorAll('.menu-item');
    const tabContents = document.querySelectorAll('.tab-content');
    
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active class from all menu items and tab contents
            menuItems.forEach(mi => mi.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));
            
            // Add active class to clicked menu item
            item.classList.add('active');
            
            // Show corresponding tab content
            const tabId = item.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Chat functionality
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    const chatMessages = document.querySelector('.chat-messages');
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, 'user');
            chatInput.value = '';
            
            // Simulate AI response after a delay
            setTimeout(() => {
                const responses = [
                    "Based on your monitoring data, I can see increased activity around your tracked personalities. Would you like me to analyze the sentiment trends?",
                    "I've detected 47 new mentions in the last hour. The majority are positive discussions about recent announcements.",
                    "Your monitoring shows peak activity during 2-4 PM. This could be optimal timing for engagement strategies.",
                    "I notice a correlation between news events and mention spikes. Would you like me to set up automated alerts?",
                    "The sentiment analysis shows 78% positive mentions today, which is 12% higher than last week's average."
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResponse, 'ai');
            }, 1000 + Math.random() * 2000);
        }
    }
    
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const avatarDiv = document.createElement('div');
        avatarDiv.className = 'message-avatar';
        
        if (sender === 'user') {
            avatarDiv.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                </svg>
            `;
        } else {
            avatarDiv.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v6m0 6v6"/>
                    <path d="m15.5 3.5-3 3-3-3"/>
                    <path d="m15.5 20.5-3-3-3 3"/>
                </svg>
            `;
        }
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = `<p>${text}</p>`;
        
        messageDiv.appendChild(avatarDiv);
        messageDiv.appendChild(contentDiv);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Live mentions simulation
    function addLiveMention() {
        const mentionsFeed = document.querySelector('.mentions-feed');
        const sources = ['Twitter', 'News', 'Reddit', 'LinkedIn', 'YouTube', 'Instagram'];
        const mentions = [
            'Breaking: New development in AI technology...',
            'Trending discussion about future innovations...',
            'Expert opinion shared on industry changes...',
            'Community reaction to recent announcement...',
            'Analysis of market trends and predictions...',
            'Interview highlights key insights...',
            'Research findings published in journal...',
            'Social media buzz around new project...'
        ];
        
        const newMention = document.createElement('div');
        newMention.className = 'mention-item';
        newMention.style.opacity = '0';
        newMention.style.transform = 'translateY(-10px)';
        
        const randomSource = sources[Math.floor(Math.random() * sources.length)];
        const randomMention = mentions[Math.floor(Math.random() * mentions.length)];
        
        newMention.innerHTML = `
            <div class="mention-source">${randomSource}</div>
            <div class="mention-text">${randomMention}</div>
            <div class="mention-time">Just now</div>
        `;
        
        // Insert at the top
        mentionsFeed.insertBefore(newMention, mentionsFeed.firstChild);
        
        // Animate in
        setTimeout(() => {
            newMention.style.transition = 'all 0.3s ease';
            newMention.style.opacity = '1';
            newMention.style.transform = 'translateY(0)';
        }, 100);
        
        // Remove oldest mentions if too many
        const mentions_items = mentionsFeed.querySelectorAll('.mention-item');
        if (mentions_items.length > 10) {
            mentionsFeed.removeChild(mentions_items[mentions_items.length - 1]);
        }
        
        // Update timestamps
        updateTimestamps();
    }
    
    function updateTimestamps() {
        const timeElements = document.querySelectorAll('.mention-time');
        timeElements.forEach((element, index) => {
            if (index === 0) {
                element.textContent = 'Just now';
            } else {
                const seconds = index * 15 + Math.floor(Math.random() * 30);
                if (seconds < 60) {
                    element.textContent = `${seconds}s ago`;
                } else {
                    const minutes = Math.floor(seconds / 60);
                    element.textContent = `${minutes}m ago`;
                }
            }
        });
    }
    
    // Add new mentions periodically
    setInterval(addLiveMention, 8000 + Math.random() * 7000);
    
    // Update stats periodically
    function updateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            if (stat.textContent.includes(',')) {
                const currentValue = parseInt(stat.textContent.replace(',', ''));
                const newValue = currentValue + Math.floor(Math.random() * 5);
                stat.textContent = newValue.toLocaleString();
            }
        });
    }
    
    setInterval(updateStats, 30000);
    
    // Animate charts on load
    setTimeout(() => {
        const bars = document.querySelectorAll('.bar');
        bars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.transform = 'scaleY(1)';
            }, index * 200);
        });
        
        const sourceFills = document.querySelectorAll('.source-fill');
        sourceFills.forEach((fill, index) => {
            setTimeout(() => {
                fill.style.transform = 'scaleX(1)';
            }, index * 300);
        });
    }, 1000);
    
    // Add hover effects to person cards
    const personCards = document.querySelectorAll('.person-card');
    personCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(-2px)';
        });
    });
    
    // Person modal functionality
    const addPersonBtn = document.getElementById('addPersonBtn');
    const personModal = document.getElementById('personModal');
    const closeModal = document.getElementById('closeModal');
    const personSearch = document.getElementById('personSearch');
    const monitoredGrid = document.getElementById('monitoredGrid');
    const emptyState = document.getElementById('emptyState');
    
    // Open modal
    addPersonBtn.addEventListener('click', () => {
        personModal.classList.add('active');
        personSearch.focus();
    });
    
    // Close modal
    closeModal.addEventListener('click', () => {
        personModal.classList.remove('active');
    });
    
    // Close modal on backdrop click
    personModal.addEventListener('click', (e) => {
        if (e.target === personModal) {
            personModal.classList.remove('active');
        }
    });
    
    // Search functionality
    personSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const suggestions = document.querySelectorAll('.suggestion-item');
        
        suggestions.forEach(item => {
            const name = item.querySelector('h4').textContent.toLowerCase();
            const title = item.querySelector('p').textContent.toLowerCase();
            
            if (name.includes(searchTerm) || title.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
    
    // Add person functionality
    document.addEventListener('click', (e) => {
        if (e.target.closest('.suggestion-item')) {
            const item = e.target.closest('.suggestion-item');
            const name = item.getAttribute('data-name');
            const title = item.getAttribute('data-title');
            const initials = name.split(' ').map(n => n[0]).join('');
            
            // Check if person is already being monitored
            const existingCards = document.querySelectorAll('.person-monitor-card');
            let alreadyExists = false;
            existingCards.forEach(card => {
                if (card.getAttribute('data-person') === name) {
                    alreadyExists = true;
                }
            });
            
            if (alreadyExists) {
                alert(`${name} is already being monitored!`);
                return;
            }
            
            // Create new person card
            const newCard = createPersonCard(name, title, initials);
            monitoredGrid.appendChild(newCard);
            
            // Hide empty state
            emptyState.style.display = 'none';
            
            // Close modal
            personModal.classList.remove('active');
            
            // Clear search
            personSearch.value = '';
            document.querySelectorAll('.suggestion-item').forEach(item => {
                item.style.display = 'flex';
            });
        }
    });
    
    // Remove person functionality
    document.addEventListener('click', (e) => {
        if (e.target.closest('.remove-person')) {
            const card = e.target.closest('.person-monitor-card');
            const personName = card.getAttribute('data-person');
            
            if (confirm(`Are you sure you want to stop monitoring ${personName}?`)) {
                card.remove();
                
                // Show empty state if no cards left
                const remainingCards = document.querySelectorAll('.person-monitor-card');
                if (remainingCards.length === 0) {
                    emptyState.style.display = 'block';
                }
            }
        }
    });
    
    // Create person card function
    function createPersonCard(name, title, initials) {
        const card = document.createElement('div');
        card.className = 'person-monitor-card';
        card.setAttribute('data-person', name);
        
        const mentionCount = Math.floor(Math.random() * 500) + 50;
        
        card.innerHTML = `
            <div class="person-header">
                <div class="person-info">
                    <div class="person-avatar">${initials}</div>
                    <div class="person-details">
                        <h3>${name}</h3>
                        <p>${title}</p>
                    </div>
                </div>
                <div class="person-controls">
                    <div class="mention-count">
                        <span class="count">${mentionCount}</span>
                        <span class="label">mentions today</span>
                    </div>
                    <button class="remove-person" title="Remove from monitoring">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                </div>
            </div>
            
            <div class="mentions-container">
                <div class="mentions-header">
                    <h4>Latest Mentions</h4>
                    <div class="live-indicator">
                        <div class="pulse-dot"></div>
                        <span>Live</span>
                    </div>
                </div>
                
                <div class="mentions-feed">
                    ${generateMentions(name)}
                </div>
            </div>
        `;
        
        return card;
    }
    
    // Generate sample mentions
    function generateMentions(personName) {
        const sources = [
            { name: 'Twitter', class: 'twitter' },
            { name: 'TechCrunch', class: 'news' },
            { name: 'Reddit', class: 'reddit' },
            { name: 'LinkedIn', class: 'news' },
            { name: 'YouTube', class: 'news' }
        ];
        
        const mentionTemplates = [
            `"${personName}'s latest announcement is revolutionary! Excited to see what's next 🚀"`,
            `"Breaking: ${personName} announces new initiative that could change the industry"`,
            `"Discussion: What do you think about ${personName}'s approach to innovation?"`,
            `"${personName} shares insights on the future of technology in recent interview"`,
            `"Analysis: How ${personName}'s strategy is reshaping the market landscape"`
        ];
        
        const sentiments = ['positive', 'neutral', 'positive', 'neutral', 'positive'];
        const engagements = ['1.2K likes', 'News Article', '89 comments', '456 shares', '2.1K views'];
        
        let mentionsHTML = '';
        for (let i = 0; i < 3; i++) {
            const source = sources[Math.floor(Math.random() * sources.length)];
            const mention = mentionTemplates[Math.floor(Math.random() * mentionTemplates.length)];
            const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
            const engagement = engagements[Math.floor(Math.random() * engagements.length)];
            const timeAgo = `${Math.floor(Math.random() * 60) + 1}m ago`;
            
            mentionsHTML += `
                <div class="mention-item">
                    <div class="mention-meta">
                        <span class="mention-source ${source.class}">${source.name}</span>
                        <span class="mention-time">${timeAgo}</span>
                    </div>
                    <p class="mention-text">${mention}</p>
                    <div class="mention-engagement">
                        <span class="sentiment ${sentiment}">${sentiment}</span>
                        <span class="engagement">${engagement}</span>
                    </div>
                </div>
            `;
        }
        
        return mentionsHTML;
    }
    
    // Add live mentions to person cards
    function addLiveMentionToCard() {
        const cards = document.querySelectorAll('.person-monitor-card');
        if (cards.length === 0) return;
        
        const randomCard = cards[Math.floor(Math.random() * cards.length)];
        const personName = randomCard.getAttribute('data-person');
        const mentionsFeed = randomCard.querySelector('.mentions-feed');
        const mentionCount = randomCard.querySelector('.mention-count .count');
        
        // Update mention count
        const currentCount = parseInt(mentionCount.textContent);
        mentionCount.textContent = currentCount + 1;
        
        // Add new mention
        const sources = [
            { name: 'Twitter', class: 'twitter' },
            { name: 'News', class: 'news' },
            { name: 'Reddit', class: 'reddit' }
        ];
        
        const mentionTemplates = [
            `"Just saw ${personName}'s latest update - absolutely brilliant!"`,
            `"${personName} continues to innovate and inspire the industry"`,
            `"Breaking news about ${personName}'s new project announcement"`
        ];
        
        const source = sources[Math.floor(Math.random() * sources.length)];
        const mention = mentionTemplates[Math.floor(Math.random() * mentionTemplates.length)];
        const sentiment = Math.random() > 0.3 ? 'positive' : 'neutral';
        
        const newMention = document.createElement('div');
        newMention.className = 'mention-item';
        newMention.style.opacity = '0';
        newMention.style.transform = 'translateY(-10px)';
        
        newMention.innerHTML = `
            <div class="mention-meta">
                <span class="mention-source ${source.class}">${source.name}</span>
                <span class="mention-time">Just now</span>
            </div>
            <p class="mention-text">${mention}</p>
            <div class="mention-engagement">
                <span class="sentiment ${sentiment}">${sentiment}</span>
                <span class="engagement">${Math.floor(Math.random() * 1000) + 100} likes</span>
            </div>
        `;
        
        // Insert at the top
        mentionsFeed.insertBefore(newMention, mentionsFeed.firstChild);
        
        // Animate in
        setTimeout(() => {
            newMention.style.transition = 'all 0.3s ease';
            newMention.style.opacity = '1';
            newMention.style.transform = 'translateY(0)';
        }, 100);
        
        // Remove oldest mentions if too many
        const mentions = mentionsFeed.querySelectorAll('.mention-item');
        if (mentions.length > 5) {
            mentionsFeed.removeChild(mentions[mentions.length - 1]);
        }
    }
    
    // Add live mentions to person cards periodically
    setInterval(addLiveMentionToCard, 12000 + Math.random() * 8000);
    
    // Drag and Drop functionality
    const dropZone = document.getElementById('dropZone');
    let draggedElement = null;
    
    // Show/hide drop zone based on active tab
    function toggleDropZone() {
        const activeTab = document.querySelector('.tab-content.active');
        if (activeTab && activeTab.id === 'ai-assistant') {
            dropZone.style.display = 'block';
        } else {
            dropZone.style.display = 'none';
        }
    }
    
    // Call on tab switch
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            setTimeout(toggleDropZone, 100);
        });
    });
    
    // Initialize drop zone visibility
    toggleDropZone();
    
    // Make mention items draggable
    function makeMentionsDraggable() {
        const mentionItems = document.querySelectorAll('.mention-item');
        mentionItems.forEach(item => {
            if (!item.hasAttribute('draggable')) {
                item.setAttribute('draggable', 'true');
                
                item.addEventListener('dragstart', (e) => {
                    draggedElement = item;
                    item.classList.add('dragging');
                    
                    // Store mention data
                    const mentionData = {
                        source: item.querySelector('.mention-source')?.textContent || 'Unknown',
                        text: item.querySelector('.mention-text')?.textContent || '',
                        time: item.querySelector('.mention-time')?.textContent || '',
                        sentiment: item.querySelector('.sentiment')?.textContent || 'neutral'
                    };
                    
                    e.dataTransfer.setData('text/plain', JSON.stringify(mentionData));
                    e.dataTransfer.effectAllowed = 'copy';
                });
                
                item.addEventListener('dragend', () => {
                    item.classList.remove('dragging');
                    draggedElement = null;
                });
            }
        });
    }
    
    // Drop zone event listeners
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        dropZone.classList.add('drag-over');
    });
    
    dropZone.addEventListener('dragleave', (e) => {
        if (!dropZone.contains(e.relatedTarget)) {
            dropZone.classList.remove('drag-over');
        }
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        
        try {
            const mentionData = JSON.parse(e.dataTransfer.getData('text/plain'));
            analyzeMentionWithAI(mentionData);
        } catch (error) {
            console.error('Error parsing dropped data:', error);
        }
    });
    
    // Analyze mention with AI
    function analyzeMentionWithAI(mentionData) {
        // Add user message showing the dropped mention
        const userMessage = `Please analyze this mention: "${mentionData.text}" (Source: ${mentionData.source}, Sentiment: ${mentionData.sentiment})`;
        addMessage(userMessage, 'user');
        
        // Generate AI analysis response
        setTimeout(() => {
            const analysisResponses = [
                `This ${mentionData.sentiment} mention from ${mentionData.source} shows strong engagement. The language suggests ${mentionData.sentiment === 'positive' ? 'enthusiasm and support' : 'neutral discussion'}. Key themes include innovation and industry impact.`,
                `Analyzing this ${mentionData.source} post: The sentiment is ${mentionData.sentiment}, indicating ${mentionData.sentiment === 'positive' ? 'favorable public perception' : 'balanced coverage'}. This type of mention typically drives ${Math.floor(Math.random() * 50) + 20}% more engagement.`,
                `This mention demonstrates ${mentionData.sentiment === 'positive' ? 'positive brand association' : 'neutral coverage'} on ${mentionData.source}. The content suggests high relevance to current industry trends. Recommend monitoring similar discussions for pattern analysis.`,
                `Content analysis: ${mentionData.sentiment} sentiment detected. This ${mentionData.source} mention aligns with recent trending topics. The engagement potential is ${mentionData.sentiment === 'positive' ? 'high' : 'moderate'} based on language patterns and source authority.`
            ];
            
            const randomResponse = analysisResponses[Math.floor(Math.random() * analysisResponses.length)];
            addMessage(randomResponse, 'ai');
        }, 1500 + Math.random() * 1000);
    }
    
    // Update mentions to be draggable when new ones are added
    const originalAddLiveMention = addLiveMention;
    addLiveMention = function() {
        originalAddLiveMention();
        setTimeout(makeMentionsDraggable, 100);
    };
    
    const originalAddLiveMentionToCard = addLiveMentionToCard;
    addLiveMentionToCard = function() {
        originalAddLiveMentionToCard();
        setTimeout(makeMentionsDraggable, 100);
    };
    
    // Make existing mentions draggable
    setTimeout(makeMentionsDraggable, 1000);
    
    // Update mentions when new person cards are created
    const originalCreatePersonCard = createPersonCard;
    createPersonCard = function(name, title, initials) {
        const card = originalCreatePersonCard(name, title, initials);
        setTimeout(makeMentionsDraggable, 100);
        return card;
    };
    
    // Initialize with some activity
    setTimeout(() => {
        addLiveMention();
    }, 2000);
    
    setTimeout(() => {
        addLiveMention();
    }, 5000);
}); 