package org.chardev.cjt.spelldescriptionparser;

import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.chardev.cjt.entity.Spell;
import org.chardev.cjt.entity.SpellAuraOptions;
import org.chardev.cjt.entity.SpellDuration;
import org.chardev.cjt.entity.SpellEffect;
import org.chardev.cjt.entity.SpellRadius;
import org.chardev.cjt.entity.SpellRange;
import org.chardev.cjt.entity.SpellScaling;
import org.chardev.cjt.entity.SpellTargetRestrictions;
import org.chardev.cjt.entity.factory.SpellFactory;
import org.chardev.cjt.spelldescriptionparser.ParserStream.ParserException;
import org.chardev.cjt.spelldescriptionparser.ast.Expression;
import org.chardev.cjt.spelldescriptionparser.ast.leaf.Decimal;
import org.chardev.cjt.spelldescriptionparser.ast.leaf.Plain;
import org.chardev.cjt.spelldescriptionparser.ast.leaf.Time;
import org.chardev.cjt.spelldescriptionparser.ast.node.ScalingTime;
import org.chardev.cjt.spelldescriptionparser.ast.node.SpellVar;
import org.chardev.cjt.spelldescriptionparser.ast.node.TextRef;

public class SpellEnvironment extends AbstractEnvironment {

	protected final SpellFactory factory;
	protected final Spell context;
	protected final Map<String, String> variables;

	public SpellEnvironment(final SpellFactory factory, final Spell context) {
		super(factory);

		this.factory = factory;
		this.context = context;

		this.variables = new HashMap<String, String>();

		if (context == null) {
			return;
		}

		int descId = context.getDescriptionVariablesId();
		if (descId > 0) {
			String definitions = this.factory.getSpellDescriptionVariables(descId);
			String[] defs = definitions.split("\\r\\n");

			for (String def : defs) {
				Matcher m = Pattern.compile(
						"^\\s*\\$(\\w+)\\s*=\\s*(.+)\\s*$").matcher(def);
				if (m.find()) {
					variables.put(m.group(1), m.group(2));
				} else {
					throw new RuntimeException(
							"Unable to match definition: " + def);
				}
			}
		}
	}

	protected Spell getSpellContext() {
		return context;
	}

	protected SpellEnvironment switchContext(final Spell ref) {
		return new SpellEnvironment(this.factory, ref);
	}

	public String lookup(final String var) {
		return variables.get(var);
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.chardev.cjt.spelldescriptionparser.Environment#evaluateReference(
	 * org.chardev.cjt.spelldescriptionparser.ast.node.TextRef)
	 */
	@Override
	public Expression evaluateReference(final TextRef ref) {

		if (ref.refName.compareToIgnoreCase("spellname") == 0) {
			try {
				return new Plain("|cFFFFFFFF" + this.getSpell(ref.refId).getName()
						+ "|r");
			} catch (NotSetException nse) {
				return ref;
			}
		}
		if (ref.refName.compareToIgnoreCase("spellicon") == 0) {
			return new Plain(this.factory.getSpellIcon(ref.refId));
		} else if (ref.refName.compareToIgnoreCase("spelldesc") == 0) {
			Spell context = this.getSpellContext();
			if (ref.refId == context.getId()) {
				return new Plain("{circular reference}");
			}
			
			try {
				Spell spell = this.getSpell(ref.refId);
				try {
					return new DescriptionParser(spell.getDescription()).parse()
							.evaluate(this.switchContext(spell)).evaluate(this);
				} catch (ParserException ex) {
					throw new RuntimeException(ex);
				}
			}
			catch( NotSetException e ) {
				return ref;
			}
		} else if (ref.refName.compareToIgnoreCase("spelltooltip") == 0) {
			Spell context = this.getSpellContext();
			if (ref.refId == context.getId()) {
				return new Plain("{circular reference}");
			}
			
			try {
				Spell spell = this.getSpell(ref.refId);
				try {
					final String tooltip = spell.getTooltip();
					
					if( null == tooltip ) {
						return new Plain("");
					}
					
					return new DescriptionParser(spell.getTooltip()).parse()
							.evaluate(this.switchContext(spell)).evaluate(this);
				} catch (ParserException ex) {
					throw new RuntimeException(ex);
				}
			}
			catch( NotSetException e ) {
				return ref;
			}
		} else {
			System.err.println("Unhandled ref: " + ref.refName
					+ ", ignoring it");
			return new Plain("@" + ref.refName + ref.refName);
		}
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * org.chardev.cjt.spelldescriptionparser.Environment#evaluateVariable(org
	 * .chardev.cjt.spelldescriptionparser.ast.node.SpellVar)
	 */
	@Override
	public Expression evaluateVariable(final SpellVar variable) {
		try {
			final int codePoint = variable.abbr.codePointAt(0);
			final int zeroBasedIndex;
			
			if( null == variable.index ) {
				zeroBasedIndex = 0;
			}
			else {
				zeroBasedIndex = variable.index > 0 ? variable.index - 1 : 0;
			}
			
			int spellId = variable.spellId == null ? this.context.getId()
					: variable.spellId;

			switch (codePoint) {
			case 'A':
				return new Decimal(this.getSpellEffectRadius(spellId, zeroBasedIndex).getMaxRadius());
			case 'a':
				return new Decimal(this.getSpellRadius(spellId, zeroBasedIndex).getMaxRadius());
			case 'o':
				return new Decimal(-1); // TODO: implement me
			case 's':
			case 'S':
			case 'm':
			case 'M': 
				SpellVar tmp = new SpellVar(spellId, variable.abbr, zeroBasedIndex + 1);
				return this.getSpellValue( tmp );
			case 'D':
			case 'd': {
				Spell s = this.getSpell(spellId);
				SpellScaling sc = s.getScaling();

				if (sc != null) {
					if (sc.getCastTimeStart() != sc.getCastTimeEnd() && sc.getIntervals() > 0) {
						return new ScalingTime(sc);
					}
				}

				return new Time(this.getSpellDuration(spellId).getDuration() / 1000d );
			}
			case 'b':
				return new Decimal(this.getSpellEffect(spellId, zeroBasedIndex).getProcChance());
			case 'e':
				return new Decimal(this.getSpellEffect(spellId, zeroBasedIndex).getProcValue());
			case 'F':
			case 'f':
				return new Decimal(this.getSpellEffect(spellId, zeroBasedIndex).getF8());
			case 'H':
			case 'h':
				return new Decimal(this.getSpellAuraOptions(spellId).getProcRate());
			case 'i':
				return new Decimal(this.getSpellTargetRestrictions(spellId).getTargetCount());
			case 'n':
				return new Decimal(this.getSpellAuraOptions(spellId).getProcCharges());
			case 'q':
				return new Decimal(this.getSpellEffect(spellId, zeroBasedIndex).getSecondaryEffect());
			case 'R':
				return new Decimal(this.getSpellRange(spellId).getMaximumHostile());
			case 'r':
				return new Decimal(this.getSpellRange(spellId).getMinimumHostile());
			case 'U':
			case 'u':
				return new Decimal(this.getSpellAuraOptions(spellId).getStacks());
			case 'w':
				return new Decimal(this.getSpellEffect(spellId, zeroBasedIndex).getValue());
			case 'p':
			case 'T':
			case 't':
				return new Decimal(this.getSpellEffect(spellId, zeroBasedIndex).getPeriod());
			case 'v':
				// TODO: Implement SpellTargetRestrictions, f3
				return new Decimal(this.getSpellTargetRestrictions(spellId).getTargetLevel());
			case 'x':
				return new Decimal(this.getSpellEffect(spellId, zeroBasedIndex).getTargets());
			case 'z':
				return new Plain("$place");
			default:
				throw new RuntimeException("Unhandled abbr:"
						+ new StringBuffer().appendCodePoint(codePoint)
								.toString());
			}
		} catch (NotSetException e) {
			System.err.println("Exception: " + e.getMessage());
			
//			System.err.println(this.context.getDescription());
//			e.printStackTrace(System.err);

			return variable;
		}
	}

	protected SpellDuration getSpellDuration(final int spellId) throws NotSetException {
				
		final SpellDuration duration = this.factory.createSpellDuration(spellId);
		
		if( null == duration ) {
			throw new NotSetException("Duration of spell (ID: "+spellId+") not found!");
		}		
		
		return duration;
	}

	protected SpellRange getSpellRange(final int spellId) throws NotSetException {
		
		final SpellRange range = this.factory.createSpellRange(spellId);
		
		if( null == range ) {
			throw new NotSetException("Range for spell (ID: "+spellId+") not found!");
		}
		
		return range;
	}

	protected SpellEffect getSpellEffect(final int spellId, final Integer index) throws NotSetException {
		
		final SpellEffect effect = this.getSpell(spellId).getEffect(index);
		
		if( null == effect ) {
			throw new NotSetException("Effect (Index: "+index+") for spell (ID: "+spellId+") not found!");
		}
		
		return effect;
	}

	protected SpellRadius getSpellEffectRadius( final int spellId, final Integer index) throws NotSetException {
		
		final SpellRadius radius = this.factory.createSpellEffectRadius(spellId, index);
		
		if( null == radius ) {
			throw new NotSetException("Effect radius for effect (Index: "+index+") of spell (ID: "+spellId+") not found!");
		}
		
		return radius;
	}

	protected SpellRadius getSpellRadius( final int spellId, final Integer index) throws NotSetException {
		
		final SpellRadius radius = this.factory.createSpellRadius(spellId, index);
		
		if( null == radius ) {
			throw new NotSetException("Spell radius for effect (Index: "+index+") of spell (ID: "+spellId+") not found!");
		}
		
		return radius;
	}

	protected SpellAuraOptions getSpellAuraOptions( final int spellId) throws NotSetException {
		
		final SpellAuraOptions aura = this.factory.createSpellAuraOptions(spellId);
		
		if( null == aura ) {
			throw new NotSetException("Aura options for spell (ID: "+spellId+") not found!");
		}
		
		return aura;
	}

	protected SpellTargetRestrictions getSpellTargetRestrictions( final int spellId) throws NotSetException {
		
		final SpellTargetRestrictions restrictions = this.factory.createSpellTargetRestrictions(spellId);
		
		if( null == restrictions ) {
			throw new NotSetException("Target restrictions for spell (ID: "+spellId+") not found!");
		}
		
		return restrictions;
	}

	public static class NotSetException extends Exception {
		private static final long serialVersionUID = -3119205983178029584L;

		public NotSetException(String msg) {
			super(msg);
		}
	}
}
