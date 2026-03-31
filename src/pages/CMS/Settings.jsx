import React, { useState, useEffect } from 'react';
import { Save, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

const SETTINGS_KEY = 'cms_settings';

const defaultSettings = {
    landingPagePrefix: 'courses', // Default: /courses/:slug
    siteName: 'Expertisor Academy'
};

export const getSettings = () => {
    try {
        const data = localStorage.getItem(SETTINGS_KEY);
        return data ? { ...defaultSettings, ...JSON.parse(data) } : defaultSettings;
    } catch {
        return defaultSettings;
    }
};

export const saveSettings = (settings) => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

const Settings = () => {
    const [settings, setSettings] = useState(defaultSettings);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setSettings(getSettings());
    }, []);

    const handleSave = () => {
        setIsSaving(true);
        saveSettings(settings);
        setTimeout(() => {
            setIsSaving(false);
            toast.success('Settings saved! Rebuild and redeploy for changes to take effect.');
        }, 500);
    };

    const handleReset = () => {
        setSettings(defaultSettings);
        saveSettings(defaultSettings);
        toast.success('Settings reset to defaults');
    };

    return (
        <div className="p-8 max-w-3xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Settings</h1>
                <p className="text-neutral-400 mt-1">Configure your CMS and landing page settings</p>
            </div>

            <div className="space-y-8">
                {/* URL Configuration */}
                <div className="bg-[#111] rounded-xl border border-neutral-800 p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">URL Configuration</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-neutral-400 mb-2">
                                Landing Page URL Prefix
                            </label>
                            <div className="flex items-center gap-2">
                                <span className="text-neutral-500">/</span>
                                <input
                                    type="text"
                                    value={settings.landingPagePrefix}
                                    onChange={(e) => setSettings({
                                        ...settings,
                                        landingPagePrefix: e.target.value.replace(/^\/|\/$/g, '').replace(/[^a-z0-9-]/gi, '-').toLowerCase()
                                    })}
                                    placeholder="landing"
                                    className="flex-1 px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-yellow-400"
                                />
                                <span className="text-neutral-500">/:slug</span>
                            </div>
                            <p className="text-xs text-neutral-500 mt-2">
                                Example: /{settings.landingPagePrefix || 'landing'}/your-template-slug
                            </p>
                        </div>

                        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                            <p className="text-sm text-yellow-400">
                                <strong>Note:</strong> After changing the URL prefix, you need to update the route in <code className="bg-black/30 px-1 rounded">App.jsx</code> and redeploy.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Site Configuration */}
                <div className="bg-[#111] rounded-xl border border-neutral-800 p-6">
                    <h2 className="text-xl font-semibold text-white mb-4">Site Configuration</h2>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm text-neutral-400 mb-2">
                                Site Name
                            </label>
                            <input
                                type="text"
                                value={settings.siteName}
                                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                                placeholder="My Site"
                                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-yellow-400"
                            />
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="flex items-center gap-2 px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition-colors disabled:opacity-50"
                    >
                        <Save className="w-5 h-5" />
                        {isSaving ? 'Saving...' : 'Save Settings'}
                    </button>

                    <button
                        onClick={handleReset}
                        className="flex items-center gap-2 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded-lg transition-colors"
                    >
                        <RefreshCw className="w-5 h-5" />
                        Reset to Defaults
                    </button>
                </div>

                {/* Info Box */}
                <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-3">How to Change URL Path</h3>
                    <ol className="list-decimal list-inside text-neutral-400 space-y-2 text-sm">
                        <li>Set your desired URL prefix above (e.g., "courses" for /courses/:slug)</li>
                        <li>Save settings</li>
                        <li>Open <code className="bg-black/50 px-1 rounded">src/App.jsx</code></li>
                        <li>Find the route: <code className="bg-black/50 px-1 rounded">&lt;Route path="/courses/:slug"</code></li>
                        <li>Change to: <code className="bg-black/50 px-1 rounded">&lt;Route path="/{settings.landingPagePrefix || 'landing'}/:slug"</code></li>
                        <li>Rebuild and redeploy</li>
                    </ol>
                </div>
            </div>
        </div>
    );
};

export default Settings;
