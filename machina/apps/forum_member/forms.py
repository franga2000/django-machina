# -*- coding: utf-8 -*-

from __future__ import unicode_literals

from django import forms

from machina.conf import settings as machina_settings
from machina.core.db.models import get_model


ForumProfile = get_model('forum_member', 'ForumProfile')


class ForumProfileForm(forms.ModelForm):

    def __init__(self, *args, **kwargs):
        super(ForumProfileForm, self).__init__(*args, **kwargs)
        if not machina_settings.PROFILE_AVATARS_ENABLED:
            del self.fields["avatar"]

        if not machina_settings.MACHINA_ENABLE_EMAIL_NOTIFICATIONS:
            del self.fields['notify_subscribed_topics']

    class Meta:
        model = ForumProfile
        fields = ['avatar', 'signature', 'auto_subscribe_topics', 'notify_subscribed_topics']
