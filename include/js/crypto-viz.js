// Cryptographic Visualization Script - Responsive Edition
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

    // Responsive font sizes based on screen width
    function getResponsiveFontSizes() {
        const width = window.innerWidth;
        
        if (width < 576) {
            // Mobile
            return {
                title: 13,
                legend: 10,
                axis: 11,
                tick: 9
            };
        } else if (width < 768) {
            // Tablet portrait
            return {
                title: 14,
                legend: 11,
                axis: 12,
                tick: 10
            };
        } else if (width < 1024) {
            // Tablet landscape
            return {
                title: 15,
                legend: 12,
                axis: 13,
                tick: 11
            };
        } else {
            // Desktop
            return {
                title: 16,
                legend: 12,
                axis: 13,
                tick: 11
            };
        }
    }

    // Common responsive options for all charts
    function getCommonOptions() {
        const fonts = getResponsiveFontSizes();
        const isMobile = window.innerWidth < 768;
        
        return {
            responsive: true,
            maintainAspectRatio: true,
            aspectRatio: isMobile ? 1.2 : 2,
            plugins: {
                legend: {
                    position: isMobile ? 'bottom' : 'top',
                    labels: {
                        font: { 
                            size: fonts.legend,
                            weight: '500'
                        },
                        color: '#2c3e50',
                        padding: isMobile ? 8 : 12,
                        boxWidth: isMobile ? 30 : 40
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        };
    }

    // Create bar chart comparison
    function createFrequencyChart() {
        const ctx = document.getElementById('freqCanvas');
        if (!ctx) return;
        
        const fonts = getResponsiveFontSizes();
        const isMobile = window.innerWidth < 768;
        const letters = Object.keys(originalFreq).slice(0, isMobile ? 8 : 12);
        
        const commonOpts = getCommonOptions();
        
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
                        borderWidth: 2,
                        barThickness: isMobile ? 'flex' : undefined,
                        maxBarThickness: isMobile ? 40 : 60
                    },
                    {
                        label: 'Standard Italian',
                        data: letters.map(l => italianStandard[l] || 0),
                        backgroundColor: 'rgba(46, 204, 113, 0.7)',
                        borderColor: 'rgba(46, 204, 113, 1)',
                        borderWidth: 2,
                        barThickness: isMobile ? 'flex' : undefined,
                        maxBarThickness: isMobile ? 40 : 60
                    }
                ]
            },
            options: {
                ...commonOpts,
                plugins: {
                    ...commonOpts.plugins,
                    title: {
                        display: true,
                        text: isMobile ? 'Letter Frequency' : 'Letter Frequency: Original vs Standard Italian',
                        font: { 
                            size: fonts.title, 
                            weight: 'bold' 
                        },
                        color: '#2c3e50',
                        padding: {
                            top: isMobile ? 8 : 12,
                            bottom: isMobile ? 12 : 16
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: !isMobile,
                            text: 'Frequency (%)',
                            font: { 
                                size: fonts.axis, 
                                weight: 'bold' 
                            },
                            color: '#2c3e50'
                        },
                        ticks: {
                            color: '#2c3e50',
                            font: { size: fonts.tick }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        title: {
                            display: !isMobile,
                            text: 'Letters',
                            font: { 
                                size: fonts.axis, 
                                weight: 'bold' 
                            },
                            color: '#2c3e50'
                        },
                        ticks: {
                            color: '#2c3e50',
                            font: { size: fonts.tick }
                        },
                        grid: {
                            display: false
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
        
        const fonts = getResponsiveFontSizes();
        const isMobile = window.innerWidth < 768;
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        
        const commonOpts = getCommonOptions();
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: alphabet,
                datasets: [
                    {
                        label: 'Original',
                        data: alphabet.map(l => originalFreq[l] || 0),
                        borderColor: 'rgba(52, 152, 219, 1)',
                        backgroundColor: 'rgba(52, 152, 219, 0.2)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: isMobile ? 2 : 3,
                        pointRadius: isMobile ? 2 : 4,
                        pointHoverRadius: isMobile ? 4 : 6
                    },
                    {
                        label: 'Encrypted (+7)',
                        data: alphabet.map(l => encryptedFreq[l] || 0),
                        borderColor: 'rgba(231, 76, 60, 1)',
                        backgroundColor: 'rgba(231, 76, 60, 0.2)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: isMobile ? 2 : 3,
                        pointRadius: isMobile ? 2 : 4,
                        pointHoverRadius: isMobile ? 4 : 6
                    }
                ]
            },
            options: {
                ...commonOpts,
                plugins: {
                    ...commonOpts.plugins,
                    title: {
                        display: true,
                        text: isMobile ? 'Frequency Distribution' : 'Frequency Distribution: Original vs Encrypted',
                        font: { 
                            size: fonts.title, 
                            weight: 'bold' 
                        },
                        color: '#2c3e50',
                        padding: {
                            top: isMobile ? 8 : 12,
                            bottom: isMobile ? 12 : 16
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: !isMobile,
                            text: 'Frequency (%)',
                            font: { 
                                size: fonts.axis, 
                                weight: 'bold' 
                            },
                            color: '#2c3e50'
                        },
                        ticks: {
                            color: '#2c3e50',
                            font: { size: fonts.tick }
                        },
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        }
                    },
                    x: {
                        title: {
                            display: !isMobile,
                            text: 'Alphabet',
                            font: { 
                                size: fonts.axis, 
                                weight: 'bold' 
                            },
                            color: '#2c3e50'
                        },
                        ticks: {
                            color: '#2c3e50',
                            font: { size: isMobile ? 8 : fonts.tick },
                            maxRotation: isMobile ? 90 : 0,
                            minRotation: isMobile ? 90 : 0
                        },
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // Debounce function for resize events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Reinitialize charts on resize
    const handleResize = debounce(() => {
        // Destroy existing charts
        Chart.helpers.each(Chart.instances, function(instance) {
            instance.destroy();
        });
        
        // Recreate charts with new responsive settings
        createFrequencyChart();
        createDistributionChart();
    }, 250);

    // Initialize charts
    function initCharts() {
        createFrequencyChart();
        createDistributionChart();
        
        // Add resize listener
        window.addEventListener('resize', handleResize);
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCharts);
    } else {
        initCharts();
    }
}
