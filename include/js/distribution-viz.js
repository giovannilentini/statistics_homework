// distribution-viz.js - Visualizations for dataset distributions

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Chart.js default configuration
    Chart.defaults.font.family = "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif";
    Chart.defaults.font.size = 13;
    
    // Color palette
    const colors = {
        primary: 'rgba(54, 162, 235, 0.8)',
        secondary: 'rgba(255, 99, 132, 0.8)',
        success: 'rgba(75, 192, 192, 0.8)',
        warning: 'rgba(255, 206, 86, 0.8)',
        info: 'rgba(153, 102, 255, 0.8)',
        male: 'rgba(54, 162, 235, 0.8)',
        female: 'rgba(255, 99, 132, 0.8)',
        border: {
            primary: 'rgba(54, 162, 235, 1)',
            secondary: 'rgba(255, 99, 132, 1)',
            success: 'rgba(75, 192, 192, 1)',
            warning: 'rgba(255, 206, 86, 1)',
            info: 'rgba(153, 102, 255, 1)',
            male: 'rgba(54, 162, 235, 1)',
            female: 'rgba(255, 99, 132, 1)'
        }
    };
    
    // Age distribution data - Updated dataset with 18 people
    const ageData = [28, 22, 35, 29, 42, 24, 31, 38, 26, 33, 27, 45, 23, 36, 25, 40, 30, 34];
    const ageLabels = ['Giovanni', 'Alessia', 'Daniele', 'Lucia', 'Marco', 
                       'Elena', 'Sara', 'Luca', 'Chiara', 'Edoardo',
                       'Francesca', 'Andrea', 'Martina', 'Alessandro', 
                       'Giulia', 'Matteo', 'Valentina', 'Simone'];
    
    // 1. Age Distribution Chart - Bar Chart
    const ageCtx = document.getElementById('ageDistributionChart');
    if (ageCtx) {
        new Chart(ageCtx, {
            type: 'bar',
            data: {
                labels: ageLabels,
                datasets: [{
                    label: 'Age (years)',
                    data: ageData,
                    backgroundColor: colors.primary,
                    borderColor: colors.border.primary,
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Age Distribution of People in Dataset',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.parsed.y + ' years';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 50,
                        title: {
                            display: true,
                            text: 'Age (years)'
                        },
                        ticks: {
                            stepSize: 5
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Person'
                        },
                        ticks: {
                            autoSkip: false,
                            maxRotation: 45,
                            minRotation: 45
                        }
                    }
                }
            }
        });
    }
    
    // 2. Gender Distribution Chart - Pie Chart
    const genderCtx = document.getElementById('genderDistributionChart');
    if (genderCtx) {
        new Chart(genderCtx, {
            type: 'doughnut',
            data: {
                labels: ['Male', 'Female'],
                datasets: [{
                    label: 'Count',
                    data: [9, 9],
                    backgroundColor: [colors.male, colors.female],
                    borderColor: [colors.border.male, colors.border.female],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Gender Distribution',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: true,
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.label || '';
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(2);
                                return label + ': ' + value + ' (' + percentage + '%)';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // 3. City Distribution Chart - Horizontal Bar Chart
    const cityCtx = document.getElementById('cityDistributionChart');
    if (cityCtx) {
        new Chart(cityCtx, {
            type: 'bar',
            data: {
                labels: ['Milano', 'Bologna', 'Roma', 'Torino', 'Napoli'],
                datasets: [{
                    label: 'Number of People',
                    data: [5, 4, 4, 3, 2],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 206, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'City Distribution',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed.x;
                                return 'Count: ' + value + ' person' + (value !== 1 ? 's' : '');
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 6,
                        title: {
                            display: true,
                            text: 'Number of People'
                        },
                        ticks: {
                            stepSize: 1
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'City'
                        }
                    }
                }
            }
        });
    }
    
    // 4. Age by Gender - Grouped Bar Chart
    const ageGenderCtx = document.getElementById('ageGenderChart');
    if (ageGenderCtx) {
        new Chart(ageGenderCtx, {
            type: 'bar',
            data: {
                labels: ['Female', 'Male'],
                datasets: [
                    {
                        label: 'Mean Age',
                        data: [26.33, 36.78],
                        backgroundColor: [colors.female, colors.male],
                        borderColor: [colors.border.female, colors.border.male],
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
                        text: 'Mean Age by Gender',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return 'Mean Age: ' + context.parsed.y.toFixed(2) + ' years';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 45,
                        title: {
                            display: true,
                            text: 'Mean Age (years)'
                        },
                        ticks: {
                            stepSize: 5
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Gender'
                        }
                    }
                }
            }
        });
    }
    
    // 5. Age Groups by Gender - Grouped Bar Chart
    const ageGroupsGenderCtx = document.getElementById('ageGroupsGenderChart');
    if (ageGroupsGenderCtx) {
        new Chart(ageGroupsGenderCtx, {
            type: 'bar',
            data: {
                labels: ['22-25', '26-30', '31-35', '36-40', '41+'],
                datasets: [
                    {
                        label: 'Female',
                        data: [4, 4, 1, 0, 0],
                        backgroundColor: colors.female,
                        borderColor: colors.border.female,
                        borderWidth: 2
                    },
                    {
                        label: 'Male',
                        data: [0, 1, 3, 3, 2],
                        backgroundColor: colors.male,
                        borderColor: colors.border.male,
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
                        text: 'Age Groups Distribution by Gender',
                        font: {
                            size: 16,
                            weight: 'bold'
                        }
                    },
                    legend: {
                        display: true,
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const label = context.dataset.label || '';
                                const value = context.parsed.y;
                                return label + ': ' + value + ' person' + (value !== 1 ? 's' : '');
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Frequency'
                        },
                        ticks: {
                            stepSize: 1
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Age Group'
                        }
                    }
                }
            }
        });
    }
});
