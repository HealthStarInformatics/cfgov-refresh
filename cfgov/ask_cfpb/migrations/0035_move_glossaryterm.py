# -*- coding: utf-8 -*-
# Generated by Django 1.11.25 on 2019-12-12 16:57
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import modelcluster.fields
import wagtail.wagtailcore.fields
import wagtail.wagtailsearch.index


class Migration(migrations.Migration):

    dependencies = [
        ('v1', '0195_move_glossaryterm'),
        ('ask_cfpb', '0034_remove_answerresultspage_content'),
    ]

    state_operations = [
        migrations.CreateModel(
            name='GlossaryTerm',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name_en', models.CharField(max_length=255, verbose_name='TERM (ENGLISH)')),
                ('definition_en', wagtail.wagtailcore.fields.RichTextField(blank=True, null=True, verbose_name='DEFINITION (ENGLISH)')),
                ('anchor_en', models.CharField(blank=True, max_length=255, null=True, verbose_name='ANCHOR SLUG (ENGLISH)')),
                ('name_es', models.CharField(blank=True, max_length=255, null=True, verbose_name='TERM (SPANISH)')),
                ('definition_es', wagtail.wagtailcore.fields.RichTextField(blank=True, null=True, verbose_name='DEFINITION (SPANISH)')),
                ('anchor_es', models.CharField(blank=True, max_length=255, null=True, verbose_name='ANCHOR SLUG (SPANISH)')),
                ('answer_page_en', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='glossary_terms', to='ask_cfpb.AnswerPage', verbose_name='ANSWER PAGE (ENGLISH)')),
                ('answer_page_es', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='glossary_terms_es', to='ask_cfpb.AnswerPage', verbose_name='ANSWER PAGE (SPANISH)')),
                ('portal_topic', modelcluster.fields.ParentalKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='glossary_terms', to='v1.PortalTopic')),
            ],
            bases=(wagtail.wagtailsearch.index.Indexed, models.Model),
        ),
        migrations.AlterUniqueTogether(
            name='glossaryterm',
            unique_together=set([('portal_topic', 'name_en')]),
        ),
    ]

    # GlossaryTerm is moving from v1.models.snippets to
    # ask_cfpb.models.snippets. Because of this, this migration will only make
    # changes to the migration state, and not to the database itself.
    operations = [
        migrations.SeparateDatabaseAndState(state_operations=state_operations)
    ]
