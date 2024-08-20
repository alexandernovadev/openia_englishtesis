import DashboardLayout from "@/components/layouts/DashBoardLayout";
import React from "react";

const GrammarPage = () => {
  return (
    <DashboardLayout>
      <h1>Comparatives and Superlatives</h1>

      <p>
        For most <strong>one-syllable adjectives</strong>, we add{" "}
        <strong>-er</strong> to form the comparative and we add{" "}
        <strong>-est</strong> to form the superlative.
      </p>
      <ul>
        <li>
          old → <strong>older</strong> / <strong>oldest</strong>
        </li>
        <li>
          fast → <strong>faster</strong> / <strong>fastest</strong>
        </li>
      </ul>

      <p>
        For most adjectives that have <strong>two syllables or more</strong>, we
        use <strong>more + adjective</strong> to form the comparative and we use
        <strong> most + adjective</strong> to form the superlative.
      </p>
      <ul>
        <li>
          useful → <strong>more useful</strong> / <strong>most useful</strong>
        </li>
        <li>
          expensive → <strong>more expensive</strong> /{" "}
          <strong>most expensive</strong>
        </li>
      </ul>

      <p>
        For some two-syllable adjectives (often adjectives that end in -y, -le,
        -ow, and -er), we can either use <strong>-er</strong> or{" "}
        <strong>more</strong> to form the comparative, and
        <strong>-est</strong> or <strong>most</strong> to form the superlative.
        We sometimes use one form more than the other (e.g., narrower is more
        common than more narrow, whereas friendlier and more friendly are both
        common).
      </p>
      <ul>
        <li>
          friendly → <strong>friendlier</strong> or{" "}
          <strong>more friendly</strong> / <strong>friendliest</strong> or{" "}
          <strong>most friendly</strong>
        </li>
        <li>
          simple → <strong>simpler</strong> or <strong>more simple</strong> /{" "}
          <strong>simplest</strong> or <strong>most simple</strong>
        </li>
        <li>
          narrow → <strong>narrower</strong> or <strong>more narrow</strong> /{" "}
          <strong>narrowest</strong> or <strong>most narrow</strong>
        </li>
      </ul>

      <h2>Spelling Rules</h2>
      <p>
        Note the following spelling rules when adding <strong>-er</strong> or{" "}
        <strong>-est</strong> to adjectives:
      </p>
      <ul>
        <li>
          For adjectives that end in <strong>-e</strong>, we just add{" "}
          <strong>-r</strong> or <strong>-st</strong>. Example: nice →{" "}
          <strong>nicer</strong> / <strong>nicest</strong>
        </li>
        <li>
          For adjectives that end in <strong>-y</strong>, we change the y to i
          and add <strong>-er</strong> or <strong>-est</strong>. Example: busy →{" "}
          <strong>busier</strong> / <strong>busiest</strong>
        </li>
        <li>
          For one-syllable adjectives that end in consonant-vowel-consonant, we
          generally double the final consonant. Example: big →{" "}
          <strong>bigger</strong> / <strong>biggest</strong>, wet →{" "}
          <strong>wetter</strong> / <strong>wettest</strong>
        </li>
        <li>
          However, we do not double w, x, or y. Example: slow →{" "}
          <strong>slower</strong> / <strong>slowest</strong>
        </li>
      </ul>

      <h2>Irregular Forms</h2>
      <p>There are three common irregular adjectives:</p>
      <ul className="pb-8">
        <li>
          good → <strong>better</strong> / <strong>best</strong>
        </li>
        <li>
          bad → <strong>worse</strong> / <strong>worst</strong>
        </li>
        <li>
          far → <strong>further</strong> or <strong>farther</strong> /{" "}
          <strong>furthest</strong> or <strong>farthest</strong>
        </li>
      </ul>

      <h2 className="pb-12">Six Adjectives with Irregular Comparative and Superlative Forms in English</h2>
      <table className="border-collapse table-auto w-full text-sm">
        <thead>
          <tr>
            <th>
              <strong>Adjetivo (base)</strong>
            </th>
            <th>
              <strong>Comparativo</strong>
            </th>
            <th>
              <strong>Superlativo</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Good (Bueno)</td>
            <td>Better (Mejor)</td>
            <td>Best (El mejor)</td>
          </tr>
          <tr>
            <td>Bad (Malo)</td>
            <td>Worse (Peor)</td>
            <td>Worst (El peor)</td>
          </tr>
          <tr>
            <td>Far (Lejos)</td>
            <td>Farther/Further (Más lejos)</td>
            <td>Farthest/Furthest (El más lejos)</td>
          </tr>
          <tr>
            <td>Little (Poco)</td>
            <td>Less (Menos)</td>
            <td>Least (El menos)</td>
          </tr>
          <tr>
            <td>Much/Many (Mucho)</td>
            <td>More (Más)</td>
            <td>Most (El más)</td>
          </tr>
          <tr>
            <td>Old (Viejo)</td>
            <td>Older/Elder (Más viejo/más anciano)</td>
            <td>Oldest/Eldest (El más viejo/el más anciano)</td>
          </tr>
        </tbody>
      </table>
    </DashboardLayout>
  );
};

export default GrammarPage;
