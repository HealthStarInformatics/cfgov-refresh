# -*- coding: utf-8 -*-
# Generated by Django 1.11.22 on 2019-10-15 22:25
from __future__ import unicode_literals

from django.db import migrations
import v1.blocks
import wagtail.wagtailcore.blocks
import wagtail.wagtailcore.fields
import wagtail.wagtailimages.blocks


class Migration(migrations.Migration):

    dependencies = [
        ('v1', '0179_formexplainerpage'),
    ]

    operations = [
        migrations.AlterField(
            model_name='formexplainerpage',
            name='content',
            field=wagtail.wagtailcore.fields.StreamField([(b'explainer', wagtail.wagtailcore.blocks.StructBlock([(b'pages', wagtail.wagtailcore.blocks.ListBlock(wagtail.wagtailcore.blocks.StructBlock([(b'image', wagtail.wagtailimages.blocks.ImageChooserBlock(icon=b'image', required=True)), (b'notes', wagtail.wagtailcore.blocks.ListBlock(wagtail.wagtailcore.blocks.StructBlock([(b'coordinates', wagtail.wagtailcore.blocks.StructBlock([(b'left', wagtail.wagtailcore.blocks.DecimalBlock(required=True)), (b'top', wagtail.wagtailcore.blocks.DecimalBlock(required=True)), (b'width', wagtail.wagtailcore.blocks.DecimalBlock(required=True)), (b'height', wagtail.wagtailcore.blocks.DecimalBlock(required=True))])), (b'heading', wagtail.wagtailcore.blocks.CharBlock(required=True)), (b'body', wagtail.wagtailcore.blocks.RichTextBlock(required=True)), (b'note_id', wagtail.wagtailcore.blocks.CharBlock(required=True)), (b'category', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[(b'checklist', b'checklist'), (b'definitions', b'definitions')], help_text=b'Select category'))], required=False)))], required=False)))])), (b'info_unit_group', wagtail.wagtailcore.blocks.StructBlock([(b'format', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[(b'50-50', b'50/50'), (b'33-33-33', b'33/33/33'), (b'25-75', b'25/75')], help_text=b'Choose the number and width of info unit columns.', label=b'Format')), (b'heading', wagtail.wagtailcore.blocks.StructBlock([(b'text', v1.blocks.HeadingTextBlock(required=False)), (b'level', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[(b'h2', b'H2'), (b'h3', b'H3'), (b'h4', b'H4')])), (b'icon', v1.blocks.HeadingIconBlock(help_text=b'Input the name of an icon to appear to the left of the heading. E.g., approved, help-round, etc. <a href="https://cfpb.github.io/capital-framework/components/cf-icons/#the-icons">See full list of icons</a>', required=False))], required=False)), (b'intro', wagtail.wagtailcore.blocks.RichTextBlock(help_text=b'If this field is not empty, the Heading field must also be set.', required=False)), (b'link_image_and_heading', wagtail.wagtailcore.blocks.BooleanBlock(default=True, help_text=b"Check this to link all images and headings to the URL of the first link in their unit's list, if there is a link.", required=False)), (b'has_top_rule_line', wagtail.wagtailcore.blocks.BooleanBlock(default=False, help_text=b'Check this to add a horizontal rule line to top of info unit group.', required=False)), (b'lines_between_items', wagtail.wagtailcore.blocks.BooleanBlock(default=False, help_text=b'Check this to show horizontal rule lines between info units.', label=b'Show rule lines between items', required=False)), (b'info_units', wagtail.wagtailcore.blocks.ListBlock(wagtail.wagtailcore.blocks.StructBlock([(b'image', wagtail.wagtailcore.blocks.StructBlock([(b'upload', wagtail.wagtailimages.blocks.ImageChooserBlock(required=False)), (b'alt', wagtail.wagtailcore.blocks.CharBlock(help_text=b"If the image is decorative (i.e., if a screenreader wouldn't have anything useful to say about it), leave the Alt field blank.", required=False))])), (b'heading', wagtail.wagtailcore.blocks.StructBlock([(b'text', v1.blocks.HeadingTextBlock(required=False)), (b'level', wagtail.wagtailcore.blocks.ChoiceBlock(choices=[(b'h2', b'H2'), (b'h3', b'H3'), (b'h4', b'H4')])), (b'icon', v1.blocks.HeadingIconBlock(help_text=b'Input the name of an icon to appear to the left of the heading. E.g., approved, help-round, etc. <a href="https://cfpb.github.io/capital-framework/components/cf-icons/#the-icons">See full list of icons</a>', required=False))], default={b'level': b'h3'}, required=False)), (b'body', wagtail.wagtailcore.blocks.RichTextBlock(blank=True, required=False)), (b'links', wagtail.wagtailcore.blocks.ListBlock(wagtail.wagtailcore.blocks.StructBlock([(b'text', wagtail.wagtailcore.blocks.CharBlock(required=False)), (b'url', wagtail.wagtailcore.blocks.CharBlock(default=b'/', required=False))]), required=False))]))), (b'sharing', wagtail.wagtailcore.blocks.StructBlock([(b'shareable', wagtail.wagtailcore.blocks.BooleanBlock(help_text=b'If checked, share links will be included below the items.', label=b'Include sharing links?', required=False)), (b'share_blurb', wagtail.wagtailcore.blocks.CharBlock(help_text=b'Sets the tweet text, email subject line, and LinkedIn post text.', required=False))]))])), (b'well', wagtail.wagtailcore.blocks.StructBlock([(b'content', wagtail.wagtailcore.blocks.RichTextBlock(label=b'Well', required=False))])), (b'feedback', wagtail.wagtailcore.blocks.StructBlock([(b'was_it_helpful_text', wagtail.wagtailcore.blocks.CharBlock(default=b'Was this page helpful to you?', help_text=b'Use this field only for feedback forms that use "Was this helpful?" radio buttons.', required=False)), (b'intro_text', wagtail.wagtailcore.blocks.CharBlock(help_text=b'Optional feedback intro', required=False)), (b'question_text', wagtail.wagtailcore.blocks.CharBlock(help_text=b'Optional expansion on intro', required=False)), (b'radio_intro', wagtail.wagtailcore.blocks.CharBlock(help_text=b'Leave blank unless you are building a feedback form with extra radio-button prompts, as in /owning-a-home/help-us-improve/.', required=False)), (b'radio_text', wagtail.wagtailcore.blocks.CharBlock(default=b'This information helps us understand your question better.', required=False)), (b'radio_question_1', wagtail.wagtailcore.blocks.CharBlock(default=b'How soon do you expect to buy a home?', required=False)), (b'radio_question_2', wagtail.wagtailcore.blocks.CharBlock(default=b'Do you currently own a home?', required=False)), (b'button_text', wagtail.wagtailcore.blocks.CharBlock(default=b'Submit')), (b'contact_advisory', wagtail.wagtailcore.blocks.RichTextBlock(help_text=b'Use only for feedback forms that ask for a contact email', required=False))]))], blank=True),
        ),
    ]
