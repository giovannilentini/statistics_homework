// Cryptographic Visualization Script
// For Homework 2 - Caesar Cipher Analysis

// Check if we're on the homework2 page
if (document.getElementById('freqCanvas')) {
    
    // Frequency data for visualization
    const originalFreq = {
        'E': 11.79, 'A': 13.42, 'I': 11.25, 'O': 8.93,
        'N': 6.24, 'R': 7.89, 'L': 6.71, 'T': 5.83,
        'S': 4.85, 'C': 3.21, 'D': 3.45, 'V': 3.12,
        'U': 2.98, 'P': 2.67, 'M': 2.34, 'G': 1.89,
        'H': 1.45, 'F': 1.23, 'B': 0.98, 'Q': 0.45
    };

    const encryptedFreq = {
        'L': 11.79, 'H': 13.42, 'P': 11.25, 'V': 8.93,
        'U': 6.24, 'Y': 7.89, 'S': 6.71, 'A': 5.83,
        'Z': 4.85, 'J': 3.21, 'K': 3.45, 'C': 3.12,
        'B': 2.98, 'W': 2.67, 'T': 2.34, 'N': 1.89,
        'O': 1.45, 'M': 1.23, 'I': 0.98, 'X': 0.45
    };

    const italianStandard = {
        'E': 11.49, 'A': 10.85, 'I': 10.18, 'O': 9.97,
        'N': 7.02, 'T': 6.97, 'R': 6.19, 'L': 5.70,
        'S': 5.48, 'C': 4.30, 'D': 3.39, 'U': 3.16,
        'P': 2.96, 'M': 2.87, 'V': 1.75, 'G': 1.65,
        'H': 1.43, 'B': 1.05, 'F': 1.01, 'Z': 0.85,
        'Q': 0.45
    };

    // Create bar chart comparison
    function createFrequencyChart() {
        const ctx = document.getElementById('freqCanvas');
        if (!ctx) return;
        
        const letters = Object.keys(originalFreq).slice(0, 12);
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: letters,
                datasets: [
                    {
                        label: 'Original Text (Dante)',
                        data: letters.map(l => originalFreq[l]),
                        backgroundColor: 'rgba(52, 152, 219, 0.7)',
                        borderColor: 'rgba(52, 152, 219, 1)',
                        borderWidth: 2
                    },
                    {
                        label: 'Standard Italian',
                        data: letters.map(l => italianStandard[l] || 0),
                        backgroundColor: 'rgba(46, 204, 113, 0.7)',
                        borderColor: 'rgba(46, 204, 113, 1)',
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Letter Frequency: Original vs Standard Italian',
                        font: { size: 16, weight: 'bold' },
                        color: '#2c3e50'
                    },
                    legend: {
                        position: 'top',
                        labels: {
                            font: { size: 12 },
                            color: '#2c3e50'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Frequency (%)',
                            font: { size: 13, weight: 'bold' },
                            color: '#2c3e50'
                        },
                        ticks: {
                            color: '#2c3e50'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Letters',
                            font: { size: 13, weight: 'bold' },
                            color: '#2c3e50'
                        },
                        ticks: {
                            color: '#2c3e50'
                        }
                    }
                }
            }
        });
    }

    // Create distribution comparison chart
    function createDistributionChart() {
        const ctx = document.getElementById('distCanvas');
        if (!ctx) return;
        
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: alphabet,
                datasets: [
                    {
                        label: 'Original Text',
                        data: alphabet.map(l => originalFreq[l] || 0),
                        borderColor: 'rgba(52, 152, 219, 1)',
                        backgroundColor: 'rgba(52, 152, 219, 0.2)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 3,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    },
                    {
                        label: 'Encrypted Text (Shift +7)',
                        data: alphabet.map(l => encryptedFreq[l] || 0),
                        borderColor: 'rgba(231, 76, 60, 1)',
                        backgroundColor: 'rgba(231, 76, 60, 0.2)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 3,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Frequency Distribution: Original vs Encrypted',
                        font: { size: 16, weight: 'bold' },
                        color: '#2c3e50'
                    },
                    legend: {
                        position: 'top',
                        labels: {
                            font: { size: 12 },
                            color: '#2c3e50'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Frequency (%)',
                            font: { size: 13, weight: 'bold' },
                            color: '#2c3e50'
                        },
                        ticks: {
                            color: '#2c3e50'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Alphabet',
                            font: { size: 13, weight: 'bold' },
                            color: '#2c3e50'
                        },
                        ticks: {
                            color: '#2c3e50',
                            font: { size: 10 }
                        }
                    }
                }
            }
        });
    }

    // Initialize charts when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            createFrequencyChart();
            createDistributionChart();
        });
    } else {
        createFrequencyChart();
        createDistributionChart();
    }
}
