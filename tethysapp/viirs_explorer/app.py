from tethys_sdk.base import TethysAppBase, url_map_maker


class ViirsExplorer(TethysAppBase):
    """
    Tethys app class for Viirs Flood Map Explorer.
    """

    name = 'Viirs Flood Map Explorer'
    index = 'viirs_explorer:home'
    icon = 'viirs_explorer/images/sattelite_flood.png'
    package = 'viirs_explorer'
    root_url = 'viirs-explorer'
    color = '#2c3e50'
    description = ''
    tags = ''
    enable_feedback = False
    feedback_emails = []

    def url_maps(self):
        """
        Add controllers
        """
        UrlMap = url_map_maker(self.root_url)

        url_maps = (
            UrlMap(
                name='home',
                url='viirs-explorer',
                controller='viirs_explorer.controllers.home'
            ),
        )

        return url_maps