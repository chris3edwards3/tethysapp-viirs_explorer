# -*- coding: utf-8 -*-

def flood_layers():
    return[("VIIRS 5-day Composite", "comp5"),
           ("VIIRS 1-day Composite", "comp1"),
           ("Joint VIIRS/ABI", "jointABI"),
           ("Joint VIIRS/AHI", "jointAHI"),
           ]

def additional_layers():
    return[("Population Density (2020)", "pop2020"),
           ("Population Density (2000)", "pop2000"),
           ("Flood Hazard Frequency & Distribution", "floodHazard"),
           ("Total Economic Risk", "totEcon"),
           ("Proportional Economic Risk", "propEcon"),
           ]