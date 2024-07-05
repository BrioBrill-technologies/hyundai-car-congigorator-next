const cars = {
    'IONIQ5': {
        'image': 'ioniq5',
        'SE': {
            'image': 'SE',
            'description': 'The balanced trim with plenty of must-have features',
            'exteriorModel': {
                'trimModel': 'ioniq5_SE_Exterior_Trim',
                'model': 'ioniq5_SE_Exterior',
                'material': 'SE',
                'removables': ['Limited', 'D100']
            },
            'interiorModel': {
                'model': {
                    'Black': 'Ioniq5_Interior_SE',
                },
                'material': 'Leather',
            },
            'exteriorColors': {
                'Atlas White': {
                    'image': 'atlas-white',
                    'name': 'Atlas White',
                    'color': '#BCBDBE'
                },
                'Abyss Black': {
                    'image': 'abyss-black',
                    'name': 'Abyss Black',
                    'color': '#000000'
                },
                'Cyber Gray': {
                    'image': 'cyber-gray',
                    'name': 'Cyber Gray',
                    'color': '#707172'
                },
                'Digital Teal': {
                    'image': 'digital-teal',
                    'name': 'Digital Teal',
                    'color': '#1E3639'
                },
                'Lucid Blue': {
                    'image': 'lucid-blue',
                    'name': 'Lucid Blue',
                    'color': '#354450'
                }
            },
            'interiorColors': {
                'Black': {
                    'image': 'SE-5-Black',
                    'name': 'Black',
                    'color': '#000000'
                },
            },
            "hotspots": {
                "exterior": {
                    "LED Projector headlights": {
                        "description": "",
                        "position": [-17, 9, -2],
                        "rotation": [0, 11, 0],
                        "scale": [2, 2, 2],
                        "cameraTarget": [-50, 20, 10],
                        "showNebulaCharging": false
                    },
                    "Ultra-fast charging": {
                        "description": "With up to 350-kW 800 volt charger, charge your vehicle from 10 - 80 percent in just 80 minutes",
                        "position": [8.5, 10, -47],
                        "rotation": [0, 11, 0],
                        "scale": [2, 2, 2],
                        "cameraTarget": [8.5, 15, -65],
                        "showNebulaCharging": true
                    }
                },
                "interior": {
                    "Interactive touch screen with sounds": {
                        "description": "The widescreen display dominates the dashboard, seamless integrating with the 12.3 inch digital gauges",
                    },
                }
            }
        },
        'Limited': {
            'image': 'limited',
            'description': 'The premium trim that treats you with high-end features',
            'exteriorModel': {
                'trimModel': 'ioniq5_Limited_Exterior_Trim',
                'model': 'ioniq5_Limited_Exterior',
                'material': 'Limited',
                'removables': ['SE', 'D100']
            },
            'interiorModel': {
                'model': {
                    'Black': 'Ioniq_5_Interior_Limited_Black',
                    'Gray Green 2 Tone': 'Ioniq_5_Interior_Limited_Grey_Green'
                },
                'material': 'Leather',
            },
            'exteriorColors': {
                'Abyss Black': {
                    'image': 'abyss-black',
                    'name': 'Abyss Black',
                    'color': '#000000'
                },
                'Shooting Star Matte': {
                    'image': 'shooting-star-matte',
                    'name': 'Shooting Star Matte',
                    'color': '#434449'
                },
                'Lucid Blue': {
                    'image': 'lucid-blue',
                    'name': 'Lucid Blue',
                    'color': '#354450'
                },
                'Digital Teal': {
                    'image': 'digital-teal',
                    'name': 'Digital Teal',
                    'color': '#1E3639'
                },
                'Gravity Gold Matte': {
                    'image': 'gravity-gold-matte',
                    'name': 'Gravity Gold Matte',
                    'color': '#A4A3A3'
                },
                'Cyber Gray': {
                    'image': 'cyber-gray',
                    'name': 'Cyber Gray',
                    'color': '#707172'
                },
                'Atlas White': {
                    'image': 'atlas-white',
                    'name': 'Atlas White',
                    'color': '#BCBDBE'
                }
            },
            'interiorColors': {
                'Black': {
                    'image': 'limited-5-Black',
                    'name': 'Black',
                    'color': '#ffffff'
                },
                'Gray Green 2 Tone': {
                    'image': 'gray-green',
                    'name': 'Gray Green 2 Tone',
                    'color': '#6D6E6F'
                }
            },
            "hotspots": {
                "exterior": {
                    "Blind Spot View Monitor": {
                        "description": "When you signal to change lanes, a live camera feed of the lane will appear on the digital instrument gauge display",
                    },
                    "Ultra-fast charging": {
                        "description": "With up to 350-kW 800 volt charger, charge your vehicle from 10 - 80 percent in just 80 minutes",
                    },
                    "Premium front LED accent lighting": {
                        "description": "Spanning Across the front, between the headlines and bumper, this lighting accents adds a premium touch",
                    },
                },
                "interior": {
                    "Interactive touch screen with sounds": {
                        "description": "The widescreen display dominates the dashboard, seamless integrating with the 12.3 inch digital gauges",
                    },
                    "Vision Roof": {
                        "description": "This expansive glass panel across the entire ceiling without a beam going across",
                    },
                    "Ambient Lighting": {
                        "description": "Set the mood with more inviting interior with ambient lighting on the door.",
                    },
                }
            }
        },
        'D100 Platinum Edition': {
            'image': 'D100PlatinumEdition',
            'description': 'Available in extremely limited quantities',
            'exteriorModel': {
                'trimModel': 'ioniq5_D100_Exterior_Trim',
                'model': 'ioniq5_D100_Exterior',
                'material': 'D100',
                'removables': ['SE', 'Limited']
            },
            'interiorModel': {
                'model': {
                    'Terra Brown 2 Tone': 'Ioniq_5_Interior_D100',
                },
                'material': 'Leather',
            },
            'exteriorColors': {
                'Gravity Gold Matte': {
                    'image': 'gravity-gold-matte',
                    'name': 'Gravity Gold Matte',
                    'color': '#A4A3A3'
                },
            },
            'interiorColors': {
                'Terra Brown 2 Tone': {
                    'image': 'terra-brown-2-tone',
                    'name': 'Terra Brown 2 Tone',
                    'color': '#6D6E6F'
                }
            },
            "hotspots": {
                "exterior": {
                    "Blind Spot View Monitor ": {
                        "description": "When you signal to change lanes, a live camera feed of the lane will appear on the digital instrument gauge display",
                    },
                    "Disney/mickey badges": {
                        "description": "",
                    },
                    "Ultra-fast charging": {
                        "description": "With up to 350-kW 800 volt charger, charge your vehicle from 10 - 80 percent in just 80 minutes",
                    },
                    "Premium front LED accent lighting": {
                        "description": "Spanning Across the front, between the headlines and bumper, this lighting accents adds a premium touch",
                    },
                },
                "interior": {
                    "Interactive touch screen with sounds": {
                        "description": "The widescreen display dominates the dashboard, seamless integrating with the 12.3 inch digital gauges",
                    },
                    "Vision Roof": {
                        "description": "This expansive glass panel across the entire ceiling without a beam going across",
                    },
                    "Ambient Lighting": {
                        "description": "Set the mood with more inviting interior with ambient lighting on the door.",
                    },
                }
            }
        },
    },
    'IONIQ6': {
        'image': 'ioniq6',
        'SE': {
            'image': 'SE6',
            'description': 'The standard trim with lots of great features',
            'removables': ['LIMITED', 'SUL'],
            'exteriorModel': {
                'trimModel': 'ioniq5_SE_Exterior_Trim',
                'model': 'Ioniq6_Master_Model',
                'material': 'Paint',
            },
            'interiorModel': {
                'model': {
                    'Black': 'Ioniq6_Master_Model',
                },
                'material': 'Leather',
            },
            'exteriorColors': {
                'Onyx Black': {
                    'image': 'onyx-black',
                    'name': 'Onyx Black',
                    'color': '#000000'
                },
                'Digital Green': {
                    'image': 'digital-green',
                    'name': 'Digital Green',
                    'color': '#BCBDBE'
                },
                'Curated Silver': {
                    'image': 'curated-silver',
                    'name': 'Curated Silver',
                    'color': '#707172'
                },
                'Ulitmate Red': {
                    'image': 'ultimate-red',
                    'name': 'Ulitmate Red',
                    'color': '#1E3639'
                },
                'Serenity White': {
                    'image': 'serenity-white',
                    'name': 'Serenity White',
                    'color': '#354450'
                },
                'Transmission Blue': {
                    'image': 'transmission-blue',
                    'name': 'Transmission Blue',
                    'color': '#354450'
                },
            },
            'interiorColors': {
                'Black': {
                    'image': 'SE-6-Black',
                    'name': 'Black',
                    'color': '#000000'
                },
            },
            "hotspots": {
                "exterior": {
                    "LED Projector headlights": {
                        "description": "",
                        "position": [-17, 9, -2],
                        "rotation": [0, 11, 0],
                        "scale": [2, 2, 2],
                        "cameraTarget": [-50, 20, 10],
                        "showNebulaCharging": false
                    },
                    "Ultra-fast charging": {
                        "description": "With up to 350-kW 800 volt charger, charge your vehicle from 10 - 80 percent in just 80 minutes",
                        "position": [8.5, 10, -47],
                        "rotation": [0, 11, 0],
                        "scale": [2, 2, 2],
                        "cameraTarget": [8.5, 15, -65],
                        "showNebulaCharging": true
                    }
                },
                "interior": {
                    "Interactive touch screen with sounds": {
                        "description": "The widescreen display dominates the dashboard, seamless integrating with the 12.3 inch digital gauges",
                    },
                }
            }
        },
        'SEL': {
            'image': 'SEL6',
            'description': 'The balance trim with plenty of must-have featuress',
            'removables': ['LIMITED', 'SE'],
            'exteriorModel': {
                'trimModel': 'ioniq5_SE_Exterior_Trim',
                'model': 'Ioniq6_Master_Model',
                'material': 'Paint',
            },
            'interiorModel': {
                'model': {
                    'Black': 'Ioniq6_Master_Model',
                    'Grey': 'Ioniq6_Master_Model',
                },
                'material': 'Leather',
            },
            'exteriorColors': {
                'Onyx Black': {
                    'image': 'onyx-black',
                    'name': 'Onyx Black',
                    'color': '#000000'
                },
                'Digital Green': {
                    'image': 'digital-green',
                    'name': 'Digital Green',
                    'color': '#BCBDBE'
                },
                'Curated Silver': {
                    'image': 'curated-silver',
                    'name': 'Curated Silver',
                    'color': '#707172'
                },
                'Ulitmate Red': {
                    'image': 'ultimate-red',
                    'name': 'Ulitmate Red',
                    'color': '#1E3639'
                },
                'Serenity White': {
                    'image': 'serenity-white',
                    'name': 'Serenity White',
                    'color': '#354450'
                },
                'Transmission Blue': {
                    'image': 'transmission-blue',
                    'name': 'Transmission Blue',
                    'color': '#354450'
                },
                'Gravity Gold Matte': {
                    'image': 'gravity-gold-matte',
                    'name': 'Gravity Gold Matte',
                    'color': '#A4A3A3'
                },

            },
            'interiorColors': {
                'Black': {
                    'image': 'Limited-6-Black',
                    'name': 'Black',
                    'color': {
                        'visibleMesh': 'SUL_B',
                        'invisibleMesh': 'SUL_G'
                    }
                },
                'Gray': {
                    'image': 'Limited-Gray',
                    'name': 'Gray',
                    'color': {
                        'visibleMesh': 'SUL_G',
                        'invisibleMesh': 'SUL_B'
                    }
                }
            },
            "hotspots": {
                "exterior": {
                    "Blind Spot View Monitor": {
                        "description": "When you signal to change lanes, a live camera feed of the lane will appear on the digital instrument gauge display",
                    },
                    "Ultra-fast charging": {
                        "description": "With up to 350-kW 800 volt charger, charge your vehicle from 10 - 80 percent in just 80 minutes",
                    },
                    "Premium front LED accent lighting": {
                        "description": "Spanning Across the front, between the headlines and bumper, this lighting accents adds a premium touch",
                    },
                },
                "interior": {
                    "Interactive touch screen with sounds": {
                        "description": "The widescreen display dominates the dashboard, seamless integrating with the 12.3 inch digital gauges",
                    },
                    "Vision Roof": {
                        "description": "This expansive glass panel across the entire ceiling without a beam going across",
                    },
                    "Ambient Lighting": {
                        "description": "Set the mood with more inviting interior with ambient lighting on the door.",
                    },
                }
            },
        },
        'Limited': {
            'image': 'Limited6',
            'description': 'The premium electric trim that treats you with high end features',
            'removables': ['SE', 'SUL'],
            'exteriorModel': {
                'trimModel': 'ioniq5_SE_Exterior_Trim',
                'model': 'Ioniq6_Master_Model',
                'material': 'Paint',
            },
            'interiorModel': {
                'model': {
                    'Black': 'Ioniq6_Master_Model',
                    'Grey': 'Ioniq6_Master_Model',
                },
                'material': 'Leather',
            },
            'exteriorColors': {
                'Onyx Black': {
                    'image': 'onyx-black',
                    'name': 'Onyx Black',
                    'color': '#000000'
                },
                'Digital Green': {
                    'image': 'digital-green',
                    'name': 'Digital Green',
                    'color': '#BCBDBE'
                },
                'Curated Silver': {
                    'image': 'curated-silver',
                    'name': 'Curated Silver',
                    'color': '#707172'
                },
                'Ulitmate Red': {
                    'image': 'ultimate-red',
                    'name': 'Ulitmate Red',
                    'color': '#1E3639'
                },
                'Serenity White': {
                    'image': 'serenity-white',
                    'name': 'Serenity White',
                    'color': '#354450'
                },
                'Transmission Blue': {
                    'image': 'transmission-blue',
                    'name': 'Transmission Blue',
                    'color': '#354450'
                },
                'Gravity Gold Matte': {
                    'image': 'gravity-gold-matte',
                    'name': 'Gravity Gold Matte',
                    'color': '#A4A3A3'
                },

            },
            'interiorColors': {
                'Black': {
                    'image': 'Limited-6-Black',
                    'name': 'Black',
                    'color': '#000000',
                    'visibleMesh': 'LIMITED_B',
                    'invisibleMesh': 'LIMITED_G'
                },
                'Gray': {
                    'image': 'Limited-Gray',
                    'name': 'Gray',
                    'color': '#6D6E6F',
                    'visibleMesh': 'LIMITED_G',
                    'invisibleMesh': 'LIMITED_B'
                }
            },
            "hotspots": {
                "exterior": {
                    "Blind Spot View Monitor ": {
                        "description": "When you signal to change lanes, a live camera feed of the lane will appear on the digital instrument gauge display",
                    },
                    "Disney/mickey badges": {
                        "description": "",
                    },
                    "Ultra-fast charging": {
                        "description": "With up to 350-kW 800 volt charger, charge your vehicle from 10 - 80 percent in just 80 minutes",
                    },
                    "Premium front LED accent lighting": {
                        "description": "Spanning Across the front, between the headlines and bumper, this lighting accents adds a premium touch",
                    },
                },
                "interior": {
                    "Interactive touch screen with sounds": {
                        "description": "The widescreen display dominates the dashboard, seamless integrating with the 12.3 inch digital gauges",
                    },
                    "Vision Roof": {
                        "description": "This expansive glass panel across the entire ceiling without a beam going across",
                    },
                    "Ambient Lighting": {
                        "description": "Set the mood with more inviting interior with ambient lighting on the door.",
                    },
                }
            },
        },
    },
}

export { cars };