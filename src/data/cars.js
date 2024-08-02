const cars = {
    'IONIQ5': {
        'image': 'ioniq5',
        'SE': {
            'trimCode': '01',
            'driveTrainCode': '2C',
            'threesixty': 'ioniq5_SE',
            'image': 'SE',
            'description': 'The balanced trim with plenty of must-have features',
            'additions': ['TRIM_SE'],
            'removables': ['TRIM_LIMITED', 'TRIM_D100'],
            'exteriorModel': {
                'trimModel': 'ioniq5_SE_Exterior_Trim',
                'model': 'Ioniq5_Master_Model',
                'material': 'SE',
                'removables': ['Limited', 'D100']
            },
            'interiorModel': {
                'model': {
                    'Black': 'Ioniq5_Master_Model',
                },
                'material': 'Leather',
            },
            'exteriorColors': {
                'Atlas White': {
                    'image': 'atlas-white',
                    'name': 'Atlas White',
                    'color': '#BCBDBE',
                    'code': '5U',
                },
                'Abyss Black': {
                    'image': 'abyss-black',
                    'name': 'Abyss Black',
                    'color': '#000000',
                    'code': '6G',
                },
                'Cyber Gray': {
                    'image': 'cyber-gray',
                    'name': 'Cyber Gray',
                    'color': '#707172',
                    'code': '5T',
                },
                'Digital Teal': {
                    'image': 'digital-teal',
                    'name': 'Digital Teal',
                    'color': '#1E3639',
                    'code': '6L',
                },
                'Lucid Blue': {
                    'image': 'lucid-blue',
                    'name': 'Lucid Blue',
                    'color': '#354450',
                    'code': '6M',
                }
            },
            'interiorColors': {
                'Black': {
                    'image': 'SE-5-Black',
                    'name': 'Black',
                    'color': {
                        'visibleMesh': ['SE_BLACK', 'BLACK_COMMON'],
                        'invisibleMesh': ['D100', 'LIMITED_BLACK', 'LIMITED_GREY']
                    },
                    'code': '0N',
                },

            },
            "hotspots": {
                "exterior": {
                    "LED Projector headlights": {
                        "description": "",
                        "position": [-32.5, 9, 7],
                        "rotation": [0, 11, 0],
                        "scale": [2, 2, 2],
                        "cameraTarget": [-50, 20, 10],
                        "showNebulaCharging": false
                    },
                    "Ultra-Fast Charging": {
                        "description": "With up to 350-kW 800 volt charger, charge your vehicle from 10 - 80% in just 18 minutes",
                        "position": [19, 10, -11],
                        "rotation": [0, 11, 0],
                        "scale": [2, 2, 2],
                        "cameraTarget": [8.5, 15, -65],
                        "showNebulaCharging": true,
                        "cylinderPosition": [19, 10, -11],
                    },
                    "LED Tail Lights": {
                        "description": "Spanning Across the rear, between the headlines and bumper, this lighting accents adds a premium touch",
                        "position": [23, 10, 7],
                    },
                },
                "interior": {
                    "Interactive touch screen with sounds": {
                        "description": "The widescreen display dominates the dashboard, seamless integrating with the 12.3 inch digital gauges",
                    },
                }
            },
            "ambientLight": {
                "Polar White ": {
                    "image": "PolarWhite",
                    "color1": "#bfade3",
                    "color2": "#bfade3"
                },
                "Moon White": {
                    "image": "MoonWhite",
                    "color1": "#d3b2a3",
                    "color2": "#d3b2a3"
                },
                "Ice Blue": {
                    "image": "IceBlue",
                    "color1": "#4abbe2",
                    "color2": "#4abbe2"
                },
                "Ocean blue": {
                    "image": "OceanBlue",
                    "color1": "#0175d4",
                    "color2": "#0175d4"
                },
                "Jade Green": {
                    "image": "JadeGreen",
                    "color1": "#01b19f",
                    "color2": "#01b19f"
                },
                "Orchid Green": {
                    "image": "OrchidGreen",
                    "color1": "#9fc92a",
                    "color2": "#9fc92a"
                },
                "Freesia Yellow": {
                    "image": "FreesiaYellow",
                    "color1": "#f88716",
                    "color2": "#f88716"
                },
                "Sunrise Red": {
                    "image": "SunriseRed",
                    "color1": "#DA1B23",
                    "color2": "#DA1B23"
                },
                "Aurora Purple": {
                    "image": "AuroraPurple",
                    "color1": "#AA1AED",
                    "color2": "#AA1AED"
                },
                "Lightining Violet": {
                    "image": "LightiningViolet",
                    "color1": "#4121A6",
                    "color2": "#4121A6"
                },
            }
        },
        'Limited': {
            'trimCode': '06',
            'driveTrainCode': '2N',
            'threesixty': 'ioniq5_LMTD',
            'image': 'limited',
            'description': 'The premium trim that treats you with high-end features',
            'additions': ['TRIM_LIMITED'],
            'removables': ['TRIM_SE', 'TRIM_D100'],
            'exteriorModel': {
                'trimModel': 'ioniq5_Limited_Exterior_Trim',
                'model': 'Ioniq5_Master_Model',
                'material': 'Limited',
                'removables': ['SE', 'D100']
            },
            'interiorModel': {
                'model': {
                    'Black': 'Ioniq5_Master_Model',
                    'Gray Green 2 Tone': 'Ioniq5_Master_Model'
                },
                'material': 'Leather',
            },
            'exteriorColors': {
                'Gravity Gold Matte': {
                    'image': 'gravity-gold-matte',
                    'name': 'Gravity Gold Matte',
                    'color': '#aca6a2',
                    'code': '6T',
                    'enableTwoInt': 'true'
                },
                'Shooting Star Matte': {
                    'image': 'shooting-star-matte',
                    'name': 'Shooting Star Matte',
                    'color': '#434449',
                    'code': '6N',
                    'enableTwoInt': 'true'
                },
                'Digital Teal': {
                    'image': 'digital-teal',
                    'name': 'Digital Teal',
                    'color': '#1E3639',
                    'code': '6L',
                    'enableTwoInt': 'true'
                },
                'Abyss Black': {
                    'image': 'abyss-black',
                    'name': 'Abyss Black',
                    'color': '#000000',
                    'code': '6G',
                    'enableTwoInt': 'false'
                },
                'Lucid Blue': {
                    'image': 'lucid-blue',
                    'name': 'Lucid Blue',
                    'color': '#354450',
                    'code': '6M',
                    'enableTwoInt': 'false'
                },
                'Cyber Gray': {
                    'image': 'cyber-gray',
                    'name': 'Cyber Gray',
                    'color': '#707172',
                    'code': '5T',
                    'enableTwoInt': 'false'
                },
                'Atlas White': {
                    'image': 'atlas-white',
                    'name': 'Atlas White',
                    'color': '#BCBDBE',
                    'code': '5U',
                    'enableTwoInt': 'false'
                }
            },
            'interiorColors': {
                'Black': {
                    'image': 'limited-5-Black',
                    'name': 'Black',
                    'color': {
                        'visibleMesh': ['LIMITED_BLACK', 'BLACK_COMMON', 'limited'],
                        'invisibleMesh': ['D100', 'SE_BLACK', 'LIMITED_GREY', 'BLACK_COMMON']
                    },
                    'code': '0N',
                },
                'Gray Green 2 Tone': {
                    'image': 'gray-green',
                    'name': 'Gray Green 2 Tone',
                    'color': {
                        'visibleMesh': ['LIMITED_GREY', 'limited'],
                        'invisibleMesh': ['D100', 'SE_BLACK', 'LIMITED_BLACK', 'BLACK_COMMON']
                    },
                    'code': '4B',
                }
            },
            "hotspots": {
                "exterior": {
                    "Blind Spot View Monitor": {
                        "description": "When you signal to change lanes, a live camera feed of the lane will appear on the digital instrument gauge display",
                    },
                    "Ultra-Fast Charging": {
                        "description": "With up to 350-kW 800 volt charger, charge your vehicle from 10 - 80% in just 18 minutes",
                        "position": [19, 10, -11],
                        "cylinderPosition": [19, 10, -11],
                    },
                    "Premium Front LED Accent Lighting": {
                        "description": "Spanning across the front of the vehicle, between the headlines and bumper, this lighting accents adds a premium touch",
                        "position": [-32.5, 9, 7],
                    },
                    "LED Projector headlights": {
                        "description": "",
                        "position": [-32.5, 9, 7],
                    },
                    "LED Tail Lights": {
                        "description": "Spanning Across the rear, between the headlines and bumper, this lighting accents adds a premium touch",
                        "position": [23, 10, 7],
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
                "Polar White ": {
                    "image": "PolarWhite",
                    "color1": "#bfade3",
                    "color2": "#bfade3"
                },
                "Moon White": {
                    "image": "MoonWhite",
                    "color1": "#d3b2a3",
                    "color2": "#d3b2a3"
                },
                "Ice Blue": {
                    "image": "IceBlue",
                    "color1": "#4abbe2",
                    "color2": "#4abbe2"
                },
                "Ocean blue": {
                    "image": "OceanBlue",
                    "color1": "#0175d4",
                    "color2": "#0175d4"
                },
                "Jade Green": {
                    "image": "JadeGreen",
                    "color1": "#01b19f",
                    "color2": "#01b19f"
                },
                "Orchid Green": {
                    "image": "OrchidGreen",
                    "color1": "#9fc92a",
                    "color2": "#9fc92a"
                },
                "Freesia Yellow": {
                    "image": "FreesiaYellow",
                    "color1": "#f88716",
                    "color2": "#f88716"
                },
                "Sunrise Red": {
                    "image": "SunriseRed",
                    "color1": "#DA1B23",
                    "color2": "#DA1B23"
                },
                "Aurora Purple": {
                    "image": "AuroraPurple",
                    "color1": "#AA1AED",
                    "color2": "#AA1AED"
                },
                "Lightining Violet": {
                    "image": "LightiningViolet",
                    "color1": "#4121A6",
                    "color2": "#4121A6"
                },
            }
        },
        'D100PlatinumEdition': {
            'trimCode': '09',
            'driveTrainCode': '1N',
            'threesixty': 'ioniq5_D100',
            'image': 'D100PlatinumEdition',
            'description': 'Available in extremely limited quantities',
            'additions': ['TRIM_D100', 'eo_roof'],
            'removables': ['TRIM_SE', 'TRIM_LIMITED'],
            'exteriorModel': {
                'trimModel': 'ioniq5_D100_Exterior_Trim',
                'model': 'Ioniq5_Master_Model',
                'material': 'D100',
                'removables': ['SE', 'Limited']
            },
            'interiorModel': {
                'model': {
                    'Terra Brown 2 Tone': 'Ioniq5_Master_Model',
                },
                'material': 'Leather',
            },
            'exteriorColors': {
                'Gravity Gold Matte': {
                    'image': 'gravity-gold-matte',
                    'name': 'Gravity Gold Matte',
                    'color': '#aca6a2',
                    'code': '6T',
                    'enableTwoInt': 'true'
                },
            },
            'interiorColors': {
                'Terra Brown 2 Tone': {
                    'image': 'terra-brown-2-tone',
                    'name': 'Terra Brown 2 Tone',
                    'color': {
                        'visibleMesh': ['D100'],
                        'invisibleMesh': ['LIMITED_BLACK', 'SE_BLACK', 'LIMITED_GREY', 'BLACK_COMMON']
                    },
                    'code': '4C',
                }
            },
            "hotspots": {
                "exterior": {
                    "Blind Spot View Monitor": {
                        "description": "When you signal to change lanes, a live camera feed of the lane will appear on the digital instrument gauge display",
                    },
                    "Disney/mickey badges": {
                        "description": "",
                    },
                    "Ultra-Fast Charging": {
                        "description": "With up to 350-kW 800 volt charger, charge your vehicle from 10 - 80% in just 18 minutes",
                        "position": [19, 10, -11],
                        "cylinderPosition": [19, 10, -11],
                    },
                    "Premium Front LED Accent Lighting": {
                        "description": "Spanning across the front of the vehicle, between the headlines and bumper, this lighting accents adds a premium touch",
                        "position": [-32.5, 9, 7],
                    },
                    "LED Projector headlights": {
                        "description": "",
                        "position": [-32.5, 9, 7],
                    },
                    "LED Tail Lights": {
                        "description": "Spanning Across the rear, between the headlines and bumper, this lighting accents adds a premium touch",
                        "position": [23, 10, 7],
                    },
                    "Disney Badge": {
                        "description": "IONIQ 5 Disney100 Platinum Edition was brought to life with creative input from Walt Disney Imagineering",
                    },
                    "Micky Badge": {
                        "description": "Exclusive 20-inch Hidden Mickey Wheels",
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
                    "D100PlatinumEdition": {
                        "description": "",
                    },
                    "D100 Edition": {
                        "description": "",
                    },
                }
            },
            "ambientLight": {
                "D Special": {
                    "image": "DSpecial",
                    "color1": "#4121A6",
                    "color2": "#4121A6"
                },
                "Polar White ": {
                    "image": "PolarWhite",
                    "color1": "#bfade3",
                    "color2": "#bfade3"
                },
                "Moon White": {
                    "image": "MoonWhite",
                    "color1": "#d3b2a3",
                    "color2": "#d3b2a3"
                },
                "Ice Blue": {
                    "image": "IceBlue",
                    "color1": "#4abbe2",
                    "color2": "#4abbe2"
                },
                "Ocean blue": {
                    "image": "OceanBlue",
                    "color1": "#0175d4",
                    "color2": "#0175d4"
                },
                "Jade Green": {
                    "image": "JadeGreen",
                    "color1": "#01b19f",
                    "color2": "#01b19f"
                },
                "Orchid Green": {
                    "image": "OrchidGreen",
                    "color1": "#9fc92a",
                    "color2": "#9fc92a"
                },
                "Freesia Yellow": {
                    "image": "FreesiaYellow",
                    "color1": "#f88716",
                    "color2": "#f88716"
                },
                "Sunrise Red": {
                    "image": "SunriseRed",
                    "color1": "#DA1B23",
                    "color2": "#DA1B23"
                },
                "Aurora Purple": {
                    "image": "AuroraPurple",
                    "color1": "#AA1AED",
                    "color2": "#AA1AED"
                },
                "Lightining Violet": {
                    "image": "LightiningViolet",
                    "color1": "#4121A6",
                    "color2": "#4121A6"
                },
            }
        },
    },
}

export { cars };