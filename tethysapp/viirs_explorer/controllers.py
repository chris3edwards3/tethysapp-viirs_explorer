from django.shortcuts import render

from tethys_sdk.gizmos import SelectInput, RangeSlider
from .options import flood_layers, additional_layers


def home(request):
    """
    Controller for the app home page.
    """

    ad_select = SelectInput(
        display_text='Select Additional Layer',
        name='ad_select',
        multiple=False,
        original=True,
        options=additional_layers(),
        initial='pop2020',
    )

    ad_opacity = RangeSlider(
        display_text='Additional Layer Opacity',
        name='ad_opacity',
        min=0,
        max=1,
        step=.05,
        initial=0.8,
    )

    fl_select = SelectInput(
        display_text='Select Flood Layer',
        name='fl_select',
        multiple=False,
        original=True,
        options=flood_layers(),
        initial='comp5',
    )

    fl_opacity = RangeSlider(
        display_text='Flood Layer Opacity',
        name='fl_opacity',
        min=0,
        max=1,
        step=.05,
        initial=.7,
    )

    context = {
        # display options
        'ad_select': ad_select,
        'ad_opacity': ad_opacity,
        'fl_select': fl_select,
        'fl_opacity': fl_opacity,
    }

    return render(request, 'viirs_explorer/home.html', context)