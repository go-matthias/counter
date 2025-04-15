document.addEventListener('DOMContentLoaded', () => {
    const textInput = document.getElementById('text-input');
    const charCount = document.getElementById('char-count');
    const wordCount = document.getElementById('word-count');
    const readingTime = document.getElementById('reading-time');
    const wordFrequencyList = document.getElementById('word-frequency-list');

    // Average reading speed in words per minute
    const WORDS_PER_MINUTE = 200;
    // Maximum number of words to show in frequency list
    const MAX_FREQUENCY_WORDS = 6;

    let lastChar = '';
    textInput.addEventListener('input', (e) => {
        const currentChar = e.data;
        updateBasicStats();
        
        // Update word frequency only when space is added or text is pasted
        if (currentChar === ' ' || e.inputType === 'insertFromPaste') {
            updateWordFrequency();
        }
        lastChar = currentChar;
    });

    function updateBasicStats() {
        const text = textInput.value;
        
        // Update character count
        charCount.textContent = text.length;

        // Update word count with improved punctuation handling
        const words = text.trim()
            .split(/[\s,.!?;:]+/)  // Split on spaces and common punctuation
            .filter(word => word.length > 0);
        wordCount.textContent = words.length;

        // Update reading time
        const minutes = Math.ceil(words.length / WORDS_PER_MINUTE);
        readingTime.textContent = `${minutes} min`;
    }

    function updateWordFrequency() {
        const text = textInput.value;
        const words = text.trim()
            .split(/[\s,.!?;:]+/)  // Split on spaces and common punctuation
            .filter(word => word.length > 0);
        
        // Clear previous frequency list
        wordFrequencyList.innerHTML = '';

        // Count word frequency
        const frequency = {};
        words.forEach(word => {
            const normalizedWord = word.toLowerCase();
            frequency[normalizedWord] = (frequency[normalizedWord] || 0) + 1;
        });

        // Convert to array and sort by frequency
        const sortedWords = Object.entries(frequency)
            .sort((a, b) => b[1] - a[1])
            .slice(0, MAX_FREQUENCY_WORDS);

        // Create word frequency elements
        sortedWords.forEach(([word, count]) => {
            const wordItem = document.createElement('div');
            wordItem.className = 'word-item';
            wordItem.innerHTML = `
                <span class="word-text">${word}</span>
                <span class="word-count">${count}</span>
            `;
            wordFrequencyList.appendChild(wordItem);
        });
    }

    // Initialize stats
    updateBasicStats();
}); 