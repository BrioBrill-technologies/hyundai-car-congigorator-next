const cars = {
    'IONIQ6': {
        'image': 'ioniq6',
        'SE': {
            'trimCode': '51',
            'driveTrainCode': '2C',
            'threesixty': 'ioniq6_SE',
            'image': 'SE6',
            'description': 'The standard trim with lots of great features',
            'additions': ['TRIM_SE'],
            'removables': ['TRIM_LMTD', 'TRIM_SUL'],
            'exteriorModel': {
                'trimModel': 'Ioniq6_SE_Exterior_Trim',
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
                    'color': '#151617',
                    'code': '6G',
                },
                'Digital Green': {
                    'image': 'digital-green',
                    'name': 'Digital Green',
                    'color': '#1C1E1B',
                    'code': '6Y',
                },
                'Curated Silver': {
                    'image': 'curated-silver',
                    'name': 'Curated Silver',
                    'color': '#868888',
                    'code': '6S',
                },
                'Ultimate Red': {
                    'image': 'ultimate-red',
                    'name': 'Ultimate Red',
                    'color': '#5B0F13',
                    'code': '6R',
                },
                'Serenity White': {
                    'image': 'serenity-white',
                    'name': 'Serenity White',
                    'color': '#C3C5C5',
                    'code': '6P',
                },
                'Transmission Blue': {
                    'image': 'transmission-blue',
                    'name': 'Transmission Blue',
                    'color': '#5C5F66',
                    'code': '6X',
                },
            },
            'interiorColors': {
                'Black': {
                    'image': 'SE-6-Black',
                    'name': 'Black',
                    'color': {
                        'visibleMesh': ['SE_B', 'BLACK_COMMON'],
                        'invisibleMesh': ['SUL_B', 'SUL_G', 'LIMITED_B', 'LIMITED_G', 'GREY_COMMON']
                    },
                    'code': '0N',
                },
            },
            "hotspots": {
                "exterior": {
                    "LED Projector headlights": {
                        "description": "",
                        "position": [-30.5, 9, 7.5],
                        "rotation": [0, 11, 0],
                        "scale": [2, 2, 2],
                        "cameraTarget": [-50, 20, 10],
                        "showNebulaCharging": false
                    },
                    "Ultra-Fast Charging": {
                        "description": "With up to 350-kW 800 volt charger, charge your vehicle from 10 - 80% in just 18 minutes",
                        "position": [17, 8.9, -12.3],
                        "rotation": [0, 11, 0],
                        "scale": [2, 2, 2],
                        "cameraTarget": [8.5, 15, -65],
                        "cylinderPosition": [18.7, 10.5, -12.8],
                        "showNebulaCharging": true
                    },
                    "LED Tail Lights": {
                        "description": "Spanning Across the rear, between the headlines and bumper, this lighting accents adds a premium touch",
                        "position": [24.8, 8.9, 5],
                    },
                },
                "interior": {
                    "Interactive touch screen with sounds": {
                        "description": "The widescreen display dominates the dashboard, seamless integrating with the 12.3 inch digital gauges",
                    },
                }
            },
            "ambientLight": {
                "Mind Care": {
                    "image": "MindCare",
                    "color1": "#e998e8",
                    "color2": "#5515a9"
                },
                "Concentration": {
                    "image": "Concentration",
                    "color1": "#55B2F8",
                    "color2": "#00a21b"
                },
                "Healing Forest": {
                    "image": "HealingForest",
                    "color1": "#e9c566",
                    "color2": "#00a21b"
                },
                "WonderFul Day": {
                    "image": "WonderfulDay",
                    "color1": "#dd4348",
                    "color2": "#e9c566"
                },
                "Meditation": {
                    "image": "Meditation",
                    "color1": "#212AF0",
                    "color2": "#4E95EB"
                },
                "Creative Moment": {
                    "image": "CreativeMoment",
                    "color1": "#22a5a3",
                    "color2": "#00a21b"
                },
            }
        },
        'SEL': {
            'trimCode': '54',
            'driveTrainCode': '2N',
            'threesixty': 'ioniq6_SEL',
            'image': 'SEL6',
            'description': 'The balance trim with plenty of must-have featuress',
            'additions': ['TRIM_SUL'],
            'removables': ['TRIM_LMTD', 'TRIM_SE'],
            'exteriorModel': {
                'trimModel': 'Ioniq6_SEL_Exterior_Trim',
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
                    'color': '#151617',
                    'code': '6G',
                    'enableTwoInt': 'true'
                },
                'Serenity White': {
                    'image': 'serenity-white',
                    'name': 'Serenity White',
                    'color': '#C3C5C5',
                    'code': '6P',
                    'enableTwoInt': 'true'
                },
                'Transmission Blue': {
                    'image': 'transmission-blue',
                    'name': 'Transmission Blue',
                    'color': '#5C5F66',
                    'code': '6X',
                    'enableTwoInt': 'true'
                },
                'Gravity Gold Matte': {
                    'image': 'gravity-gold-matte',
                    'name': 'Gravity Gold Matte',
                    'color': '#aca6a2',
                    'code': '6T',
                    'enableTwoInt': 'true'
                },
                'Digital Green': {
                    'image': 'digital-green',
                    'name': 'Digital Green',
                    'color': '#1C1E1B',
                    'code': '6Y',
                    'enableTwoInt': 'false'
                },
                'Curated Silver': {
                    'image': 'curated-silver',
                    'name': 'Curated Silver',
                    'color': '#868888',
                    'code': '6S',
                    'enableTwoInt': 'false'
                },
                'Ultimate Red': {
                    'image': 'ultimate-red',
                    'name': 'Ultimate Red',
                    'color': '#5B0F13',
                    'code': '6R',
                    'enableTwoInt': 'false'
                },
            },
            'interiorColors': {
                'Black': {
                    'image': 'Limited-6-Black',
                    'name': 'Black',
                    'color': {
                        'visibleMesh': ['SUL_B', 'BLACK_COMMON'],
                        'invisibleMesh': ['SUL_G', 'SE_B', 'LIMITED_B', 'LIMITED_G', 'GREY_COMMON']
                    },
                    'code': '0N',
                },
                'Gray': {
                    'image': 'Limited-Gray',
                    'name': 'Gray',
                    'color': {
                        'visibleMesh': ['SUL_G', 'GREY_COMMON'],
                        'invisibleMesh': ['SUL_B', 'SE_B', 'LIMITED_B', 'LIMITED_G', 'BLACK_COMMON']
                    },
                    'code': '3V',
                }
            },
            "hotspots": {
                "exterior": {
                    "Blind Spot View Monitor": {
                        "description": "When you signal to change lanes, a live camera feed of the lane will appear on the digital instrument gauge display",
                    },
                    "Ultra-Fast Charging": {
                        "description": "With up to 350-kW 800 volt charger, charge your vehicle from 10 - 80% in just 18 minutes",
                        "position": [17, 8.9, -12.3],
                        "cylinderPosition": [18.7, 10.5, -12.8],
                    },
                    "LED Projector headlights": {
                        "description": "",
                        "position": [-30.5, 9, 7.5],
                    },
                    "LED Tail Lights": {
                        "description": "Spanning Across the rear, between the headlines and bumper, this lighting accents adds a premium touch",
                        "position": [24.8, 8.9, 5],
                    },
                },
                "interior": {
                    "Interactive touch screen with sounds": {
                        "description": "The widescreen display dominates the dashboard, seamless integrating with the 12.3 inch digital gauges",
                    },
                    "Power tilt-and-slide wide sunroof": {
                        "description": "This expansive glass panel across the entire ceiling without a beam going across",
                    },
                    "Ambient Lighting": {
                        "description": "Set the mood with more inviting interior with ambient lighting on the door.",
                    },
                }
            },
            "ambientLight": {
                "Mind Care": {
                    "image": "MindCare",
                    "color1": "#e998e8",
                    "color2": "#5515a9"
                },
                "Concentration": {
                    "image": "Concentration",
                    "color1": "#55B2F8",
                    "color2": "#00a21b"
                },
                "Healing Forest": {
                    "image": "HealingForest",
                    "color1": "#e9c566",
                    "color2": "#00a21b"
                },
                "WonderFul Day": {
                    "image": "WonderfulDay",
                    "color1": "#dd4348",
                    "color2": "#e9c566"
                },
                "Meditation": {
                    "image": "Meditation",
                    "color1": "#212AF0",
                    "color2": "#4E95EB"
                },
                "Creative Moment": {
                    "image": "CreativeMoment",
                    "color1": "#22a5a3",
                    "color2": "#00a21b"
                },
            }
        },
        'Limited': {
            'trimCode': '56',
            'driveTrainCode': '2N',
            'threesixty': 'ioniq6_LMTD',
            'image': 'Limited6',
            'description': 'The premium electric trim that treats you with high end features',
            'additions': ['TRIM_LMTD'],
            'removables': ['TRIM_SE', 'TRIM_SUL'],
            'exteriorModel': {
                'trimModel': 'Ioniq6_Limited_Exterior_Trim',
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
                    'color': '#151617',
                    'code': '6G',
                    'enableTwoInt': 'true'
                },
                'Serenity White': {
                    'image': 'serenity-white',
                    'name': 'Serenity White',
                    'color': '#C3C5C5',
                    'code': '6P',
                    'enableTwoInt': 'true'
                },
                'Transmission Blue': {
                    'image': 'transmission-blue',
                    'name': 'Transmission Blue',
                    'color': '#5C5F66',
                    'code': '6X',
                    'enableTwoInt': 'true'
                },
                'Gravity Gold Matte': {
                    'image': 'gravity-gold-matte',
                    'name': 'Gravity Gold Matte',
                    'color': '#aca6a2',
                    'code': '6T',
                    'enableTwoInt': 'true'
                },
                'Digital Green': {
                    'image': 'digital-green',
                    'name': 'Digital Green',
                    'color': '#1C1E1B',
                    'code': '6Y',
                    'enableTwoInt': 'false'
                },
                'Curated Silver': {
                    'image': 'curated-silver',
                    'name': 'Curated Silver',
                    'color': '#868888',
                    'code': '6S',
                    'enableTwoInt': 'false'
                },
                'Ultimate Red': {
                    'image': 'ultimate-red',
                    'name': 'Ultimate Red',
                    'color': '#5B0F13',
                    'code': '6R',
                    'enableTwoInt': 'false'
                },
            },
            'interiorColors': {
                'Black': {
                    'image': 'Limited-6-Black',
                    'name': 'Black',
                    'color': {
                        'visibleMesh': ['LIMITED_B', 'BLACK_COMMON'],
                        'invisibleMesh': ['LIMITED_G', 'SE_B', 'SUL_B', 'SUL_G', 'GREY_COMMON']
                    },
                    'code': '0N',
                },
                'Gray': {
                    'image': 'Limited-Gray',
                    'name': 'Gray',
                    'color': {
                        'visibleMesh': ['LIMITED_G', 'GREY_COMMON'],
                        'invisibleMesh': ['LIMITED_B', 'SE_B', 'SUL_B', 'SUL_G', 'BLACK_COMMON']
                    },
                    'code': '3V',
                }
            },
            "hotspots": {
                "exterior": {
                    "Blind Spot View Monitor": {
                        "description": "When you signal to change lanes, a live camera feed of the lane will appear on the digital instrument gauge display",
                        "position": [-9, 12.3, -14],
                    },
                    "Disney/mickey badges": {
                        "description": "",
                    },
                    "Ultra-Fast Charging": {
                        "description": "With up to 350-kW 800 volt charger, charge your vehicle from 10 - 80% in just 18 minutes",
                        "position": [17, 8.9, -12.3],
                        "cylinderPosition": [18.7, 10.5, -12.8],
                    },
                    "LED Projector headlights": {
                        "description": "",
                        "position": [-30.5, 9, 7.5],
                    },
                    "LED Tail Lights": {
                        "description": "Spanning Across the rear, between the headlines and bumper, this lighting accents adds a premium touch",
                        "position": [24.8, 8.9, 5],
                    },
                },
                "interior": {
                    "Interactive touch screen with sounds": {
                        "description": "The widescreen display dominates the dashboard, seamless integrating with the 12.3 inch digital gauges",
                    },
                    "Power tilt-and-slide wide sunroof": {
                        "description": "This expansive glass panel across the entire ceiling without a beam going across",
                    },
                    "Ambient Lighting": {
                        "description": "Set the mood with more inviting interior with ambient lighting on the door.",
                    },
                }
            },
            "ambientLight": {
                "Mind Care": {
                    "image": "MindCare",
                    "color1": "#e998e8",
                    "color2": "#5515a9"
                },
                "Concentration": {
                    "image": "Concentration",
                    "color1": "#55B2F8",
                    "color2": "#00a21b"
                },
                "Healing Forest": {
                    "image": "HealingForest",
                    "color1": "#e9c566",
                    "color2": "#00a21b"
                },
                "WonderFul Day": {
                    "image": "WonderfulDay",
                    "color1": "#dd4348",
                    "color2": "#e9c566"
                },
                "Meditation": {
                    "image": "Meditation",
                    "color1": "#212AF0",
                    "color2": "#4E95EB"
                },
                "Creative Moment": {
                    "image": "CreativeMoment",
                    "color1": "#22a5a3",
                    "color2": "#00a21b"
                },
            }
        },
    },
}

export { cars };