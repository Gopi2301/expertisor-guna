import React, { useState } from 'react';
import { CreditCard, Layout } from 'lucide-react';
import TabNavigation from '../../components/CMSComponents/TabNavigation';
import CourseCardTab from './CourseCardTab';
import TemplateTab from './TemplateTab';

/**
 * Course Editor with Tabbed Interface
 * Two tabs: Course Card and Template
 */
const CourseEditorTabs = ({ course, setCourse, isNew, saving, onSave, onPublish }) => {
    const [activeTab, setActiveTab] = useState('course-card');

    const tabs = [
        {
            id: 'course-card',
            label: 'Course Card',
            icon: CreditCard
        },
        {
            id: 'template',
            label: 'Template',
            icon: Layout
        }
    ];

    return (
        <div className="flex-1 flex flex-col">
            {/* Tab Navigation */}
            <TabNavigation
                tabs={tabs}
                activeTab={activeTab}
                onChange={setActiveTab}
            />

            {/* Tab Content */}
            <div className="flex-1 overflow-auto">
                {activeTab === 'course-card' && (
                    <CourseCardTab
                        course={course}
                        setCourse={setCourse}
                        isNew={isNew}
                    />
                )}

                {activeTab === 'template' && (
                    <TemplateTab
                        course={course}
                        setCourse={setCourse}
                    />
                )}
            </div>
        </div>
    );
};

export default CourseEditorTabs;
