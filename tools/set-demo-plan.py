#!/usr/bin/env python3
"""Update both static bootstrap fixtures for a fictional demo plan."""
import argparse
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEMO_ORG = '00000000-0000-4000-8000-000000000002'
PLANS = {
    'free': (None, 'auto_api_evaluation', 'Free'),
    'pro': ('claude_pro', 'default_claude_pro', 'Pro'),
    'max': ('claude_max', 'default_claude_max_5x', 'Max'),
    'ultra': ('claude_max', 'default_claude_max_20x', 'Ultra'),
}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('plan', choices=PLANS)
    plan = parser.parse_args().plan
    capability, tier, label = PLANS[plan]
    locks = json.loads((ROOT / 'tools/pro-model-locks.json').read_text())
    outputs = {}
    for name in ('bootstrap', 'app-start'):
        path = ROOT / f'edge-api/{name}.json'
        data = json.loads(path.read_text())
        org, = [m['organization'] for m in data['account']['memberships']
                if m['organization']['uuid'] == DEMO_ORG]
        org['capabilities'] = [c for c in org['capabilities']
                               if c not in {'claude_pro', 'claude_max'}]
        if capability:
            org['capabilities'].append(capability)
        org['rate_limit_tier'] = tier
        org['plan_display_name'] = label
        for selector in data['model_selector_config']:
            for model in selector['models']:
                if model['id'] in locks.get(selector['id'], []):
                    if plan == 'free':
                        model.update(disabled=True, disabled_reason={
                            'type': 'upgrade_required', 'required_plan': 'pro'})
                    else:
                        model.pop('disabled', None)
                        model.pop('disabled_reason', None)
        outputs[path] = json.dumps(data, indent=2, ensure_ascii=False) + '\n'
    for path, contents in outputs.items():
        path.write_text(contents)


if __name__ == '__main__':
    main()
